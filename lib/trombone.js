/*
P I N K   T R O M B O N E

Bare-handed procedural speech synthesis

version 1.1, March 2017
by Neil Thapen
venuspatrol.nfshost.com


Bibliography

Julius O. Smith III, "Physical audio signal processing for virtual musical instruments and audio effects."
https://ccrma.stanford.edu/~jos/pasp/

Story, Brad H. "A parametric model of the vocal tract area function for vowel and consonant simulation."
The Journal of the Acoustical Society of America 117.5 (2005): 3231-3254.

Lu, Hui-Ling, and J. O. Smith. "Glottal source modeling for singing voice synthesis."
Proceedings of the 2000 International Computer Music Conference. 2000.

Mullen, Jack. Physical modelling of the vocal tract with the 2D digital waveguide mesh.
PhD thesis, University of York, 2006.


Copyright 2017 Neil Thapen

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

*/
import { simplex1 } from './simplex.js'

const clamp = function (number, min, max) {
  if (number < min) return min
  else if (number > max) return max
  else return number
}

const moveTowards = function (current, target, amountUp, amountDown) {
  if (current < target) return Math.min(current + amountUp, target)
  else return Math.max(current - amountDown, target)
}

const gaussian = function () {
  var s = 0
  for (var c = 0; c < 16; c++) s += Math.random()
  return (s - 8) / 4
}

class PinkTrombone {
  constructor(audioContext, destination=audioContext.destination) {
    this.blockLength = 512
    this.blockTime = 1
    this.started = false
    this.soundOn = false
    this.audioContext = audioContext
    this.destination = destination
    this.sampleRate = this.audioContext.sampleRate

    this.blockTime = this.blockLength / this.sampleRate

    this.glottis = new Glottis(this)
    this.tract = new Tract(this)
  }
  start() {
    //scriptProcessor may need a dummy input channel on iOS
    this.scriptProcessor = this.audioContext.createScriptProcessor(this.blockLength, 2, 1)
    this.scriptProcessor.connect(this.destination)
    this.scriptProcessor.onaudioprocess = this.doScriptProcessor.bind(this)

    this.whiteNoise = this.createWhiteNoiseNode(2 * this.sampleRate) // 2 seconds of noise

    var aspirateFilter = this.audioContext.createBiquadFilter()
    aspirateFilter.type = "bandpass"
    aspirateFilter.frequency.value = 500
    aspirateFilter.Q.value = 0.5
    this.whiteNoise.connect(aspirateFilter)
    aspirateFilter.connect(this.scriptProcessor)

    var fricativeFilter = this.audioContext.createBiquadFilter()
    fricativeFilter.type = "bandpass"
    fricativeFilter.frequency.value = 1000
    fricativeFilter.Q.value = 0.5
    this.whiteNoise.connect(fricativeFilter)
    fricativeFilter.connect(this.scriptProcessor)

    this.whiteNoise.start(0)
  }

  stop() {
    this.whiteNoise.stop()
    this.scriptProcessor.disconnect()
  }

  createWhiteNoiseNode(frameCount) {
    var myArrayBuffer = this.audioContext.createBuffer(1, frameCount, this.sampleRate)

    var nowBuffering = myArrayBuffer.getChannelData(0)
    for (var i = 0; i < frameCount; i++) {
      nowBuffering[i] = Math.random()// gaussian()
    }

    var source = this.audioContext.createBufferSource()
    source.buffer = myArrayBuffer
    source.loop = true

    return source
  }

  doScriptProcessor(event) {
    const { tract, glottis } = this
    var inputArray1 = event.inputBuffer.getChannelData(0)
    var inputArray2 = event.inputBuffer.getChannelData(1)
    var outArray = event.outputBuffer.getChannelData(0)
    for (var j = 0, N = outArray.length; j < N; j++) {
      var lambda1 = j / N
      var lambda2 = (j + 0.5) / N
      var glottalOutput = glottis.runStep(lambda1, inputArray1[j])

      var vocalOutput = 0
      //Tract runs at twice the sample rate
      tract.runStep(glottalOutput, inputArray2[j], lambda1)
      vocalOutput += tract.lipOutput + tract.noseOutput
      tract.runStep(glottalOutput, inputArray2[j], lambda2)
      vocalOutput += tract.lipOutput + tract.noseOutput
      outArray[j] = vocalOutput * 0.125
    }
    glottis.finishBlock()
    tract.finishBlock()
  }

  mute() { this.scriptProcessor.disconnect() }
  unmute() { this.scriptProcessor.connect(this.destination) }
}

class Glottis {
  constructor(trombone) {
    this.timeInWaveform = 0
    this.oldFrequency = 140
    this.newFrequency = 140
    this.targetFrequency = 140
    this.smoothFrequency = 140
    this.oldTenseness = 0.6
    this.newTenseness = 0.6
    this.targetTenseness = 0.6
    this.totalTime = 0
    this.vibratoAmount = 0.005
    this.vibratoFrequency = 6
    this.intensity = 0
    this.loudness = 1
    this.alwaysVoice = true
    this.autoWobble = true
    this.isTouched = false

    this.setupWaveform(0)
    this.trombone = trombone
  }

  runStep(lambda, noiseSource) {
    var timeStep = 1.0 / this.trombone.sampleRate
    this.timeInWaveform += timeStep
    this.totalTime += timeStep
    if (this.timeInWaveform > this.waveformLength) {
      this.timeInWaveform -= this.waveformLength
      this.setupWaveform(lambda)
    }
    var out = this.normalizedLFWaveform(this.timeInWaveform / this.waveformLength)
    var aspiration = this.intensity * (1 - Math.sqrt(this.targetTenseness)) * this.getNoiseModulator() * noiseSource
    aspiration *= 0.2 + 0.02 * simplex1(this.totalTime * 1.99)
    out += aspiration
    return out
  }

  getNoiseModulator() {
    var voiced = 0.1 + 0.2 * Math.max(0, Math.sin(Math.PI * 2 * this.timeInWaveform / this.waveformLength))
    //return 0.3
    return this.targetTenseness * this.intensity * voiced + (1 - this.targetTenseness * this.intensity) * 0.3
  }

  finishBlock() {
    var vibrato = 0
    vibrato += this.vibratoAmount * Math.sin(2 * Math.PI * this.totalTime * this.vibratoFrequency)
    vibrato += 0.02 * simplex1(this.totalTime * 4.07)
    vibrato += 0.04 * simplex1(this.totalTime * 2.15)
    if (this.autoWobble) {
      vibrato += 0.2 * simplex1(this.totalTime * 0.98)
      vibrato += 0.4 * simplex1(this.totalTime * 0.5)
    }
    if (this.targetFrequency > this.smoothFrequency)
      this.smoothFrequency = Math.min(this.smoothFrequency * 1.1, this.targetFrequency)
    if (this.targetFrequency < this.smoothFrequency)
      this.smoothFrequency = Math.max(this.smoothFrequency / 1.1, this.targetFrequency)
    this.oldFrequency = this.newFrequency
    this.newFrequency = this.smoothFrequency * (1 + vibrato)
    this.oldTenseness = this.newTenseness
    this.newTenseness = this.targetTenseness
      + 0.1 * simplex1(this.totalTime * 0.46) + 0.05 * simplex1(this.totalTime * 0.36)
    if (!this.isTouched && this.alwaysVoice) this.newTenseness += (3 - this.targetTenseness) * (1 - this.intensity)

    if (this.isTouched || this.alwaysVoice) this.intensity += 0.13
    else this.intensity -= 0.05
    this.intensity = clamp(this.intensity, 0, 1)
  }

  setupWaveform(lambda) {
    this.frequency = this.oldFrequency * (1 - lambda) + this.newFrequency * lambda
    var tenseness = this.oldTenseness * (1 - lambda) + this.newTenseness * lambda
    this.Rd = 3 * (1 - tenseness)
    this.waveformLength = 1.0 / this.frequency

    var Rd = this.Rd
    if (Rd < 0.5) Rd = 0.5
    if (Rd > 2.7) Rd = 2.7
    var output
    // normalized to time = 1, Ee = 1
    var Ra = -0.01 + 0.048 * Rd
    var Rk = 0.224 + 0.118 * Rd
    var Rg = (Rk / 4) * (0.5 + 1.2 * Rk) / (0.11 * Rd - Ra * (0.5 + 1.2 * Rk))

    var Ta = Ra
    var Tp = 1 / (2 * Rg)
    var Te = Tp + Tp * Rk //

    var epsilon = 1 / Ta
    var shift = Math.exp(-epsilon * (1 - Te))
    var Delta = 1 - shift //divide by this to scale RHS

    var RHSIntegral = (1 / epsilon) * (shift - 1) + (1 - Te) * shift
    RHSIntegral = RHSIntegral / Delta

    var totalLowerIntegral = - (Te - Tp) / 2 + RHSIntegral
    var totalUpperIntegral = -totalLowerIntegral

    var omega = Math.PI / Tp
    var s = Math.sin(omega * Te)
    // need E0*e^(alpha*Te)*s = -1 (to meet the return at -1)
    // and E0*e^(alpha*Tp/2) * Tp*2/pi = totalUpperIntegral
    //             (our approximation of the integral up to Tp)
    // writing x for e^alpha,
    // have E0*x^Te*s = -1 and E0 * x^(Tp/2) * Tp*2/pi = totalUpperIntegral
    // dividing the second by the first,
    // letting y = x^(Tp/2 - Te),
    // y * Tp*2 / (pi*s) = -totalUpperIntegral
    var y = -Math.PI * s * totalUpperIntegral / (Tp * 2)
    var z = Math.log(y)
    var alpha = z / (Tp / 2 - Te)
    var E0 = -1 / (s * Math.exp(alpha * Te))
    this.alpha = alpha
    this.E0 = E0
    this.epsilon = epsilon
    this.shift = shift
    this.Delta = Delta
    this.Te = Te
    this.omega = omega
  }


  normalizedLFWaveform(t) {
    let output
    if (t > this.Te) output = (-Math.exp(-this.epsilon * (t - this.Te)) + this.shift) / this.Delta
    else output = this.E0 * Math.exp(this.alpha * t) * Math.sin(this.omega * t)

    return output * this.intensity * this.loudness
  }
}

class Tract {
  constructor(trombone) {
    this.n = 44
    this.bladeStart = 10
    this.tipStart = 32
    this.lipStart = 39
    this.R = [] //component going right
    this.L = [] //component going left
    this.reflection = []
    this.junctionOutputR = []
    this.junctionOutputL = []
    this.maxAmplitude = []
    this.diameter = []
    this.restDiameter = []
    this.targetDiameter = []
    this.newDiameter = []
    this.A = []
    this.glottalReflection = 0.75
    this.lipReflection = -0.85
    this.lastObstruction = -1
    this.fade = 1.0 //0.9999
    this.movementSpeed = 15 //cm per second
    this.transients = []
    this.lipOutput = 0
    this.noseOutput = 0
    this.velumTarget = 0.01

    this.bladeStart = Math.floor(this.bladeStart * this.n / 44)
    this.tipStart = Math.floor(this.tipStart * this.n / 44)
    this.lipStart = Math.floor(this.lipStart * this.n / 44)
    this.diameter = new Float64Array(this.n)
    this.restDiameter = new Float64Array(this.n)
    this.targetDiameter = new Float64Array(this.n)
    this.newDiameter = new Float64Array(this.n)
    for (var i = 0; i < this.n; i++) {
      var diameter = 0
      if (i < 7 * this.n / 44 - 0.5) diameter = 0.6
      else if (i < 12 * this.n / 44) diameter = 1.1
      else diameter = 1.5
      this.diameter[i] = this.restDiameter[i] = this.targetDiameter[i] = this.newDiameter[i] = diameter
    }
    this.R = new Float64Array(this.n)
    this.L = new Float64Array(this.n)
    this.reflection = new Float64Array(this.n + 1)
    this.newReflection = new Float64Array(this.n + 1)
    this.junctionOutputR = new Float64Array(this.n + 1)
    this.junctionOutputL = new Float64Array(this.n + 1)
    this.A = new Float64Array(this.n)
    this.maxAmplitude = new Float64Array(this.n)

    this.noseLength = Math.floor(28 * this.n / 44)
    this.noseStart = this.n - this.noseLength + 1
    this.noseR = new Float64Array(this.noseLength)
    this.noseL = new Float64Array(this.noseLength)
    this.noseJunctionOutputR = new Float64Array(this.noseLength + 1)
    this.noseJunctionOutputL = new Float64Array(this.noseLength + 1)
    this.noseReflection = new Float64Array(this.noseLength + 1)
    this.noseDiameter = new Float64Array(this.noseLength)
    this.noseA = new Float64Array(this.noseLength)
    this.noseMaxAmplitude = new Float64Array(this.noseLength)
    for (var i = 0; i < this.noseLength; i++) {
      var diameter
      var d = 2 * (i / this.noseLength)
      if (d < 1) diameter = 0.4 + 1.6 * d
      else diameter = 0.5 + 1.5 * (2 - d)
      diameter = Math.min(diameter, 1.9)
      this.noseDiameter[i] = diameter
    }
    this.newReflectionLeft = this.newReflectionRight = this.newReflectionNose = 0
    this.calculateReflections()
    this.calculateNoseReflections()
    this.noseDiameter[0] = this.velumTarget

    this.trombone = trombone
  }

  reshapeTract(deltaTime) {
    var amount = deltaTime * this.movementSpeed
    var newLastObstruction = -1
    for (var i = 0; i < this.n; i++) {
      var diameter = this.diameter[i]
      var targetDiameter = this.targetDiameter[i]
      if (diameter <= 0) newLastObstruction = i
      var slowReturn
      if (i < this.noseStart) slowReturn = 0.6
      else if (i >= this.tipStart) slowReturn = 1.0
      else slowReturn = 0.6 + 0.4 * (i - this.noseStart) / (this.tipStart - this.noseStart)
      this.diameter[i] = moveTowards(diameter, targetDiameter, slowReturn * amount, 2 * amount)
    }
    if (this.lastObstruction > -1 && newLastObstruction == -1 && this.noseA[0] < 0.05) {
      this.addTransient(this.lastObstruction)
    }
    this.lastObstruction = newLastObstruction

    amount = deltaTime * this.movementSpeed
    this.noseDiameter[0] = moveTowards(this.noseDiameter[0], this.velumTarget,
      amount * 0.25, amount * 0.1)
    this.noseA[0] = this.noseDiameter[0] * this.noseDiameter[0]
  }

  calculateReflections() {
    for (var i = 0; i < this.n; i++) {
      this.A[i] = this.diameter[i] * this.diameter[i] //ignoring PI etc.
    }
    for (var i = 1; i < this.n; i++) {
      this.reflection[i] = this.newReflection[i]
      if (this.A[i] == 0) this.newReflection[i] = 0.999 //to prevent some bad behaviour if 0
      else this.newReflection[i] = (this.A[i - 1] - this.A[i]) / (this.A[i - 1] + this.A[i])
    }

    //now at junction with nose

    this.reflectionLeft = this.newReflectionLeft
    this.reflectionRight = this.newReflectionRight
    this.reflectionNose = this.newReflectionNose
    var sum = this.A[this.noseStart] + this.A[this.noseStart + 1] + this.noseA[0]
    this.newReflectionLeft = (2 * this.A[this.noseStart] - sum) / sum
    this.newReflectionRight = (2 * this.A[this.noseStart + 1] - sum) / sum
    this.newReflectionNose = (2 * this.noseA[0] - sum) / sum
  }

  calculateNoseReflections() {
    for (var i = 0; i < this.noseLength; i++) {
      this.noseA[i] = this.noseDiameter[i] * this.noseDiameter[i]
    }
    for (var i = 1; i < this.noseLength; i++) {
      this.noseReflection[i] = (this.noseA[i - 1] - this.noseA[i]) / (this.noseA[i - 1] + this.noseA[i])
    }
  }

  runStep(glottalOutput, turbulenceNoise, lambda) {
    var updateAmplitudes = (Math.random() < 0.1)

    //mouth
    this.processTransients()
    this.addTurbulenceNoise(turbulenceNoise)

    //this.glottalReflection = -0.8 + 1.6 * Glottis.newTenseness
    this.junctionOutputR[0] = this.L[0] * this.glottalReflection + glottalOutput
    this.junctionOutputL[this.n] = this.R[this.n - 1] * this.lipReflection

    for (var i = 1; i < this.n; i++) {
      var r = this.reflection[i] * (1 - lambda) + this.newReflection[i] * lambda
      var w = r * (this.R[i - 1] + this.L[i])
      this.junctionOutputR[i] = this.R[i - 1] - w
      this.junctionOutputL[i] = this.L[i] + w
    }

    //now at junction with nose
    var i = this.noseStart
    var r = this.newReflectionLeft * (1 - lambda) + this.reflectionLeft * lambda
    this.junctionOutputL[i] = r * this.R[i - 1] + (1 + r) * (this.noseL[0] + this.L[i])
    r = this.newReflectionRight * (1 - lambda) + this.reflectionRight * lambda
    this.junctionOutputR[i] = r * this.L[i] + (1 + r) * (this.R[i - 1] + this.noseL[0])
    r = this.newReflectionNose * (1 - lambda) + this.reflectionNose * lambda
    this.noseJunctionOutputR[0] = r * this.noseL[0] + (1 + r) * (this.L[i] + this.R[i - 1])

    for (var i = 0; i < this.n; i++) {
      this.R[i] = this.junctionOutputR[i] * 0.999
      this.L[i] = this.junctionOutputL[i + 1] * 0.999

      //this.R[i] = clamp(this.junctionOutputR[i] * this.fade, -1, 1)
      //this.L[i] = clamp(this.junctionOutputL[i+1] * this.fade, -1, 1)

      if (updateAmplitudes) {
        var amplitude = Math.abs(this.R[i] + this.L[i])
        if (amplitude > this.maxAmplitude[i]) this.maxAmplitude[i] = amplitude
        else this.maxAmplitude[i] *= 0.999
      }
    }

    this.lipOutput = this.R[this.n - 1]

    //nose
    this.noseJunctionOutputL[this.noseLength] = this.noseR[this.noseLength - 1] * this.lipReflection

    for (var i = 1; i < this.noseLength; i++) {
      var w = this.noseReflection[i] * (this.noseR[i - 1] + this.noseL[i])
      this.noseJunctionOutputR[i] = this.noseR[i - 1] - w
      this.noseJunctionOutputL[i] = this.noseL[i] + w
    }

    for (var i = 0; i < this.noseLength; i++) {
      this.noseR[i] = this.noseJunctionOutputR[i] * this.fade
      this.noseL[i] = this.noseJunctionOutputL[i + 1] * this.fade

      //this.noseR[i] = clamp(this.noseJunctionOutputR[i] * this.fade, -1, 1)
      //this.noseL[i] = clamp(this.noseJunctionOutputL[i+1] * this.fade, -1, 1)

      if (updateAmplitudes) {
        var amplitude = Math.abs(this.noseR[i] + this.noseL[i])
        if (amplitude > this.noseMaxAmplitude[i]) this.noseMaxAmplitude[i] = amplitude
        else this.noseMaxAmplitude[i] *= 0.999
      }
    }

    this.noseOutput = this.noseR[this.noseLength - 1]

  }

  finishBlock() {
    this.reshapeTract(this.trombone.blockTime)
    this.calculateReflections()
  }

  addTransient(position) {
    var trans = {}
    trans.position = position
    trans.timeAlive = 0
    trans.lifeTime = 0.2
    trans.strength = 0.3
    trans.exponent = 200
    this.transients.push(trans)
  }

  processTransients() {
    for (var i = 0; i < this.transients.length; i++) {
      var trans = this.transients[i]
      var amplitude = trans.strength * Math.pow(2, -trans.exponent * trans.timeAlive)
      this.R[trans.position] += amplitude / 2
      this.L[trans.position] += amplitude / 2
      trans.timeAlive += 1.0 / (this.trombone.sampleRate * 2)
    }
    for (var i = this.transients.length - 1; i >= 0; i--) {
      var trans = this.transients[i]
      if (trans.timeAlive > trans.lifeTime) {
        this.transients.splice(i, 1)
      }
    }
  }

  addTurbulenceNoise(turbulenceNoise) {
    // for (var j=0 j<UI.touchesWithMouse.length j++)
    // {
    //     var touch = UI.touchesWithMouse[j]
    //     if (touch.index<2 || touch.index>Tract.n) continue
    //     if (touch.diameter<=0) continue
    //     var intensity = touch.fricative_intensity
    //     if (intensity == 0) continue
    //     this.addTurbulenceNoiseAtIndex(0.66*turbulenceNoise*intensity, touch.index, touch.diameter)
    // }
  }

  addTurbulenceNoiseAtIndex(turbulenceNoise, index, diameter) {
    var i = Math.floor(index)
    var delta = index - i
    turbulenceNoise *= this.trombone.glottis.getNoiseModulator()
    var thinness0 = clamp(8 * (0.7 - diameter), 0, 1)
    var openness = clamp(30 * (diameter - 0.3), 0, 1)
    var noise0 = turbulenceNoise * (1 - delta) * thinness0 * openness
    var noise1 = turbulenceNoise * delta * thinness0 * openness
    this.R[i + 1] += noise0 / 2
    this.L[i + 1] += noise0 / 2
    this.R[i + 2] += noise1 / 2
    this.L[i + 2] += noise1 / 2
  }
}

export default PinkTrombone


