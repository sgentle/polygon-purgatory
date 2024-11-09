/*
  AAaaaaaAAaAAaaaAAaaAaaAaAAAAaaAAaaAAAaaAAAaAAaAaaAAAaAAaAaAA

  CC0/Public Domain
*/

import PinkTrombone from './lib/trombone.js'
import { Engine, Events, Render, World, Bodies, Body, Mouse, MouseConstraint } from './lib/matter.js'

const audioContext = new window.AudioContext()

const limiter = audioContext.createDynamicsCompressor()
limiter.attack.value = 0
limiter.release.value = 0.05
limiter.connect(audioContext.destination)

const gain = audioContext.createGain()
gain.gain.value = 0.25
gain.connect(limiter)

var engine = Engine.create({
  enableSleeping: true
})

const world = engine.world

const W = document.body.offsetWidth
const H = document.body.offsetHeight
const S = Math.min(W, H)

var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: W,
    height: H
  }
})


const clamp = (n, low = 0, high = 1) => Math.max(low, Math.min(high, n)) || 0

const addShape = (shape) => {
  const trombone = new PinkTrombone(audioContext, gain)
  trombone.start()

  let n = Math.random()
  for (let i = 0; i < trombone.tract.n; i++) {
    n = clamp(n + Math.random() * 0.1, 0, 5)
    trombone.tract.targetDiameter[i] = n
  }

  Events.on(shape, 'sleepStart', () => trombone.mute())
  Events.on(shape, 'sleepEnd', () => trombone.unmute())

  shape._trombone = trombone

  World.add(world, shape)
}

Events.on(engine, 'afterUpdate', () => {
  for (const body of world.bodies) if (body._trombone) {
    const y = clamp((H - body.position.y) / H)
    const x = clamp((W - body.position.x) / W)
    const { glottis, tract } = body._trombone
    glottis.targetFrequency = y * (800 - body.mass) + 200
    glottis.targetTenseness = clamp(body.angularSpeed * 2)

    const N = tract.n / 2
    const i = Math.floor(x * N + N)
    tract.targetDiameter[i] = clamp((tract.targetDiameter[i] + clamp(body.speed) * 5) / 2, 0, 10)

    const bounds = body.bounds

    if (bounds.max.x < 0) Body.translate(body, { x: W - bounds.min.x, y: 0 })
    if (bounds.min.x > W) Body.translate(body, { x: 0 - bounds.max.x, y: 0 })
  }
})

const shapeBuilders = [
  (x, y, r) => Bodies.circle(x, y, r),
  (x, y, r) => Bodies.polygon(x, y, 3, r),
  (x, y, r) => Bodies.polygon(x, y, 4, r),
  (x, y, r) => Bodies.polygon(x, y, 5, r),
  (x, y, r) => Bodies.polygon(x, y, 6, r),
]

const addRandShape = () => {
  const x = Math.random() * W
  const y = Math.random() * H/2 - H/2
  const r = Math.random() * S/6 + S/10
  const shape = shapeBuilders[Math.floor(Math.random() * shapeBuilders.length)]
  addShape(shape(x, y, r))
}

const mouse = Mouse.create(render.canvas)
render.mouse = mouse

const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    angularStiffness: 0.4,
    render: {
      visible: false
    }
  }
})
World.add(world, mouseConstraint)

const ground = Bodies.rectangle(0, H+25, W*3, 60, { isStatic: true })
World.add(world, ground)

for (let i = 0; i < 4; i++) addRandShape()

const start = () => {
  Engine.run(engine)
  Render.run(render)
}

const warning = document.querySelector('#warning')
warning.addEventListener('click', () => {
  audioContext.resume()
  // warning.remove()
  warning.style.display = 'none'
  start()
})
