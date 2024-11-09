var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/matter-js/build/matter.js
var require_matter = __commonJS({
  "node_modules/matter-js/build/matter.js"(exports, module) {
    (function(f) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.Matter = f();
      }
    })(function() {
      var define2, module2, exports2;
      return (/* @__PURE__ */ function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof __require && __require;
                if (!f && c) return c(i2, true);
                if (u) return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++) o(t[i]);
          return o;
        }
        return r;
      }())({ 1: [function(_dereq_, module3, exports3) {
        var Body2 = {};
        module3.exports = Body2;
        var Vertices = _dereq_("../geometry/Vertices");
        var Vector = _dereq_("../geometry/Vector");
        var Sleeping = _dereq_("../core/Sleeping");
        var Render2 = _dereq_("../render/Render");
        var Common = _dereq_("../core/Common");
        var Bounds = _dereq_("../geometry/Bounds");
        var Axes = _dereq_("../geometry/Axes");
        (function() {
          Body2._inertiaScale = 4;
          Body2._nextCollidingGroupId = 1;
          Body2._nextNonCollidingGroupId = -1;
          Body2._nextCategory = 1;
          Body2.create = function(options) {
            var defaults = {
              id: Common.nextId(),
              type: "body",
              label: "Body",
              parts: [],
              plugin: {},
              angle: 0,
              vertices: Vertices.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
              position: { x: 0, y: 0 },
              force: { x: 0, y: 0 },
              torque: 0,
              positionImpulse: { x: 0, y: 0 },
              constraintImpulse: { x: 0, y: 0, angle: 0 },
              totalContacts: 0,
              speed: 0,
              angularSpeed: 0,
              velocity: { x: 0, y: 0 },
              angularVelocity: 0,
              isSensor: false,
              isStatic: false,
              isSleeping: false,
              motion: 0,
              sleepThreshold: 60,
              density: 1e-3,
              restitution: 0,
              friction: 0.1,
              frictionStatic: 0.5,
              frictionAir: 0.01,
              collisionFilter: {
                category: 1,
                mask: 4294967295,
                group: 0
              },
              slop: 0.05,
              timeScale: 1,
              render: {
                visible: true,
                opacity: 1,
                sprite: {
                  xScale: 1,
                  yScale: 1,
                  xOffset: 0,
                  yOffset: 0
                },
                lineWidth: 0
              }
            };
            var body = Common.extend(defaults, options);
            _initProperties(body, options);
            return body;
          };
          Body2.nextGroup = function(isNonColliding) {
            if (isNonColliding)
              return Body2._nextNonCollidingGroupId--;
            return Body2._nextCollidingGroupId++;
          };
          Body2.nextCategory = function() {
            Body2._nextCategory = Body2._nextCategory << 1;
            return Body2._nextCategory;
          };
          var _initProperties = function(body, options) {
            options = options || {};
            Body2.set(body, {
              bounds: body.bounds || Bounds.create(body.vertices),
              positionPrev: body.positionPrev || Vector.clone(body.position),
              anglePrev: body.anglePrev || body.angle,
              vertices: body.vertices,
              parts: body.parts || [body],
              isStatic: body.isStatic,
              isSleeping: body.isSleeping,
              parent: body.parent || body
            });
            Vertices.rotate(body.vertices, body.angle, body.position);
            Axes.rotate(body.axes, body.angle);
            Bounds.update(body.bounds, body.vertices, body.velocity);
            Body2.set(body, {
              axes: options.axes || body.axes,
              area: options.area || body.area,
              mass: options.mass || body.mass,
              inertia: options.inertia || body.inertia
            });
            var defaultFillStyle = body.isStatic ? "#2e2b44" : Common.choose(["#006BA6", "#0496FF", "#FFBC42", "#D81159", "#8F2D56"]), defaultStrokeStyle = "#000";
            body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
            body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
            body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
            body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
          };
          Body2.set = function(body, settings, value) {
            var property;
            if (typeof settings === "string") {
              property = settings;
              settings = {};
              settings[property] = value;
            }
            for (property in settings) {
              value = settings[property];
              if (!settings.hasOwnProperty(property))
                continue;
              switch (property) {
                case "isStatic":
                  Body2.setStatic(body, value);
                  break;
                case "isSleeping":
                  Sleeping.set(body, value);
                  break;
                case "mass":
                  Body2.setMass(body, value);
                  break;
                case "density":
                  Body2.setDensity(body, value);
                  break;
                case "inertia":
                  Body2.setInertia(body, value);
                  break;
                case "vertices":
                  Body2.setVertices(body, value);
                  break;
                case "position":
                  Body2.setPosition(body, value);
                  break;
                case "angle":
                  Body2.setAngle(body, value);
                  break;
                case "velocity":
                  Body2.setVelocity(body, value);
                  break;
                case "angularVelocity":
                  Body2.setAngularVelocity(body, value);
                  break;
                case "parts":
                  Body2.setParts(body, value);
                  break;
                default:
                  body[property] = value;
              }
            }
          };
          Body2.setStatic = function(body, isStatic) {
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              part.isStatic = isStatic;
              if (isStatic) {
                part._original = {
                  restitution: part.restitution,
                  friction: part.friction,
                  mass: part.mass,
                  inertia: part.inertia,
                  density: part.density,
                  inverseMass: part.inverseMass,
                  inverseInertia: part.inverseInertia
                };
                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;
                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
              } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;
                delete part._original;
              }
            }
          };
          Body2.setMass = function(body, mass) {
            var moment = body.inertia / (body.mass / 6);
            body.inertia = moment * (mass / 6);
            body.inverseInertia = 1 / body.inertia;
            body.mass = mass;
            body.inverseMass = 1 / body.mass;
            body.density = body.mass / body.area;
          };
          Body2.setDensity = function(body, density) {
            Body2.setMass(body, density * body.area);
            body.density = density;
          };
          Body2.setInertia = function(body, inertia) {
            body.inertia = inertia;
            body.inverseInertia = 1 / body.inertia;
          };
          Body2.setVertices = function(body, vertices) {
            if (vertices[0].body === body) {
              body.vertices = vertices;
            } else {
              body.vertices = Vertices.create(vertices, body);
            }
            body.axes = Axes.fromVertices(body.vertices);
            body.area = Vertices.area(body.vertices);
            Body2.setMass(body, body.density * body.area);
            var centre = Vertices.centre(body.vertices);
            Vertices.translate(body.vertices, centre, -1);
            Body2.setInertia(body, Body2._inertiaScale * Vertices.inertia(body.vertices, body.mass));
            Vertices.translate(body.vertices, body.position);
            Bounds.update(body.bounds, body.vertices, body.velocity);
          };
          Body2.setParts = function(body, parts, autoHull) {
            var i;
            parts = parts.slice(0);
            body.parts.length = 0;
            body.parts.push(body);
            body.parent = body;
            for (i = 0; i < parts.length; i++) {
              var part = parts[i];
              if (part !== body) {
                part.parent = body;
                body.parts.push(part);
              }
            }
            if (body.parts.length === 1)
              return;
            autoHull = typeof autoHull !== "undefined" ? autoHull : true;
            if (autoHull) {
              var vertices = [];
              for (i = 0; i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
              }
              Vertices.clockwiseSort(vertices);
              var hull = Vertices.hull(vertices), hullCentre = Vertices.centre(hull);
              Body2.setVertices(body, hull);
              Vertices.translate(body.vertices, hullCentre);
            }
            var total = Body2._totalProperties(body);
            body.area = total.area;
            body.parent = body;
            body.position.x = total.centre.x;
            body.position.y = total.centre.y;
            body.positionPrev.x = total.centre.x;
            body.positionPrev.y = total.centre.y;
            Body2.setMass(body, total.mass);
            Body2.setInertia(body, total.inertia);
            Body2.setPosition(body, total.centre);
          };
          Body2.setPosition = function(body, position) {
            var delta = Vector.sub(position, body.position);
            body.positionPrev.x += delta.x;
            body.positionPrev.y += delta.y;
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              part.position.x += delta.x;
              part.position.y += delta.y;
              Vertices.translate(part.vertices, delta);
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
          };
          Body2.setAngle = function(body, angle) {
            var delta = angle - body.angle;
            body.anglePrev += delta;
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              part.angle += delta;
              Vertices.rotate(part.vertices, delta, body.position);
              Axes.rotate(part.axes, delta);
              Bounds.update(part.bounds, part.vertices, body.velocity);
              if (i > 0) {
                Vector.rotateAbout(part.position, delta, body.position, part.position);
              }
            }
          };
          Body2.setVelocity = function(body, velocity) {
            body.positionPrev.x = body.position.x - velocity.x;
            body.positionPrev.y = body.position.y - velocity.y;
            body.velocity.x = velocity.x;
            body.velocity.y = velocity.y;
            body.speed = Vector.magnitude(body.velocity);
          };
          Body2.setAngularVelocity = function(body, velocity) {
            body.anglePrev = body.angle - velocity;
            body.angularVelocity = velocity;
            body.angularSpeed = Math.abs(body.angularVelocity);
          };
          Body2.translate = function(body, translation) {
            Body2.setPosition(body, Vector.add(body.position, translation));
          };
          Body2.rotate = function(body, rotation, point) {
            if (!point) {
              Body2.setAngle(body, body.angle + rotation);
            } else {
              var cos = Math.cos(rotation), sin = Math.sin(rotation), dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body2.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
              });
              Body2.setAngle(body, body.angle + rotation);
            }
          };
          Body2.scale = function(body, scaleX, scaleY, point) {
            var totalArea = 0, totalInertia = 0;
            point = point || body.position;
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              Vertices.scale(part.vertices, scaleX, scaleY, point);
              part.axes = Axes.fromVertices(part.vertices);
              part.area = Vertices.area(part.vertices);
              Body2.setMass(part, body.density * part.area);
              Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
              Body2.setInertia(part, Body2._inertiaScale * Vertices.inertia(part.vertices, part.mass));
              Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });
              if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
              }
              part.position.x = point.x + (part.position.x - point.x) * scaleX;
              part.position.y = point.y + (part.position.y - point.y) * scaleY;
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
            if (body.parts.length > 1) {
              body.area = totalArea;
              if (!body.isStatic) {
                Body2.setMass(body, body.density * totalArea);
                Body2.setInertia(body, totalInertia);
              }
            }
            if (body.circleRadius) {
              if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
              } else {
                body.circleRadius = null;
              }
            }
          };
          Body2.update = function(body, deltaTime, timeScale, correction) {
            var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);
            var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale, velocityPrevX = body.position.x - body.positionPrev.x, velocityPrevY = body.position.y - body.positionPrev.y;
            body.velocity.x = velocityPrevX * frictionAir * correction + body.force.x / body.mass * deltaTimeSquared;
            body.velocity.y = velocityPrevY * frictionAir * correction + body.force.y / body.mass * deltaTimeSquared;
            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;
            body.position.x += body.velocity.x;
            body.position.y += body.velocity.y;
            body.angularVelocity = (body.angle - body.anglePrev) * frictionAir * correction + body.torque / body.inertia * deltaTimeSquared;
            body.anglePrev = body.angle;
            body.angle += body.angularVelocity;
            body.speed = Vector.magnitude(body.velocity);
            body.angularSpeed = Math.abs(body.angularVelocity);
            for (var i = 0; i < body.parts.length; i++) {
              var part = body.parts[i];
              Vertices.translate(part.vertices, body.velocity);
              if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
              }
              if (body.angularVelocity !== 0) {
                Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                  Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                }
              }
              Bounds.update(part.bounds, part.vertices, body.velocity);
            }
          };
          Body2.applyForce = function(body, position, force) {
            body.force.x += force.x;
            body.force.y += force.y;
            var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
            body.torque += offset.x * force.y - offset.y * force.x;
          };
          Body2._totalProperties = function(body) {
            var properties = {
              mass: 0,
              area: 0,
              inertia: 0,
              centre: { x: 0, y: 0 }
            };
            for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
              var part = body.parts[i], mass = part.mass !== Infinity ? part.mass : 1;
              properties.mass += mass;
              properties.area += part.area;
              properties.inertia += part.inertia;
              properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
            }
            properties.centre = Vector.div(properties.centre, properties.mass);
            return properties;
          };
        })();
      }, { "../core/Common": 14, "../core/Sleeping": 22, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29, "../render/Render": 31 }], 2: [function(_dereq_, module3, exports3) {
        var Composite = {};
        module3.exports = Composite;
        var Events2 = _dereq_("../core/Events");
        var Common = _dereq_("../core/Common");
        var Bounds = _dereq_("../geometry/Bounds");
        var Body2 = _dereq_("./Body");
        (function() {
          Composite.create = function(options) {
            return Common.extend({
              id: Common.nextId(),
              type: "composite",
              parent: null,
              isModified: false,
              bodies: [],
              constraints: [],
              composites: [],
              label: "Composite",
              plugin: {}
            }, options);
          };
          Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
            composite.isModified = isModified;
            if (updateParents && composite.parent) {
              Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
            }
            if (updateChildren) {
              for (var i = 0; i < composite.composites.length; i++) {
                var childComposite = composite.composites[i];
                Composite.setModified(childComposite, isModified, updateParents, updateChildren);
              }
            }
          };
          Composite.add = function(composite, object) {
            var objects = [].concat(object);
            Events2.trigger(composite, "beforeAdd", { object });
            for (var i = 0; i < objects.length; i++) {
              var obj = objects[i];
              switch (obj.type) {
                case "body":
                  if (obj.parent !== obj) {
                    Common.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                    break;
                  }
                  Composite.addBody(composite, obj);
                  break;
                case "constraint":
                  Composite.addConstraint(composite, obj);
                  break;
                case "composite":
                  Composite.addComposite(composite, obj);
                  break;
                case "mouseConstraint":
                  Composite.addConstraint(composite, obj.constraint);
                  break;
              }
            }
            Events2.trigger(composite, "afterAdd", { object });
            return composite;
          };
          Composite.remove = function(composite, object, deep) {
            var objects = [].concat(object);
            Events2.trigger(composite, "beforeRemove", { object });
            for (var i = 0; i < objects.length; i++) {
              var obj = objects[i];
              switch (obj.type) {
                case "body":
                  Composite.removeBody(composite, obj, deep);
                  break;
                case "constraint":
                  Composite.removeConstraint(composite, obj, deep);
                  break;
                case "composite":
                  Composite.removeComposite(composite, obj, deep);
                  break;
                case "mouseConstraint":
                  Composite.removeConstraint(composite, obj.constraint);
                  break;
              }
            }
            Events2.trigger(composite, "afterRemove", { object });
            return composite;
          };
          Composite.addComposite = function(compositeA, compositeB) {
            compositeA.composites.push(compositeB);
            compositeB.parent = compositeA;
            Composite.setModified(compositeA, true, true, false);
            return compositeA;
          };
          Composite.removeComposite = function(compositeA, compositeB, deep) {
            var position = Common.indexOf(compositeA.composites, compositeB);
            if (position !== -1) {
              Composite.removeCompositeAt(compositeA, position);
              Composite.setModified(compositeA, true, true, false);
            }
            if (deep) {
              for (var i = 0; i < compositeA.composites.length; i++) {
                Composite.removeComposite(compositeA.composites[i], compositeB, true);
              }
            }
            return compositeA;
          };
          Composite.removeCompositeAt = function(composite, position) {
            composite.composites.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.addBody = function(composite, body) {
            composite.bodies.push(body);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.removeBody = function(composite, body, deep) {
            var position = Common.indexOf(composite.bodies, body);
            if (position !== -1) {
              Composite.removeBodyAt(composite, position);
              Composite.setModified(composite, true, true, false);
            }
            if (deep) {
              for (var i = 0; i < composite.composites.length; i++) {
                Composite.removeBody(composite.composites[i], body, true);
              }
            }
            return composite;
          };
          Composite.removeBodyAt = function(composite, position) {
            composite.bodies.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.addConstraint = function(composite, constraint) {
            composite.constraints.push(constraint);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.removeConstraint = function(composite, constraint, deep) {
            var position = Common.indexOf(composite.constraints, constraint);
            if (position !== -1) {
              Composite.removeConstraintAt(composite, position);
            }
            if (deep) {
              for (var i = 0; i < composite.composites.length; i++) {
                Composite.removeConstraint(composite.composites[i], constraint, true);
              }
            }
            return composite;
          };
          Composite.removeConstraintAt = function(composite, position) {
            composite.constraints.splice(position, 1);
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.clear = function(composite, keepStatic, deep) {
            if (deep) {
              for (var i = 0; i < composite.composites.length; i++) {
                Composite.clear(composite.composites[i], keepStatic, true);
              }
            }
            if (keepStatic) {
              composite.bodies = composite.bodies.filter(function(body) {
                return body.isStatic;
              });
            } else {
              composite.bodies.length = 0;
            }
            composite.constraints.length = 0;
            composite.composites.length = 0;
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.allBodies = function(composite) {
            var bodies = [].concat(composite.bodies);
            for (var i = 0; i < composite.composites.length; i++)
              bodies = bodies.concat(Composite.allBodies(composite.composites[i]));
            return bodies;
          };
          Composite.allConstraints = function(composite) {
            var constraints = [].concat(composite.constraints);
            for (var i = 0; i < composite.composites.length; i++)
              constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));
            return constraints;
          };
          Composite.allComposites = function(composite) {
            var composites = [].concat(composite.composites);
            for (var i = 0; i < composite.composites.length; i++)
              composites = composites.concat(Composite.allComposites(composite.composites[i]));
            return composites;
          };
          Composite.get = function(composite, id, type) {
            var objects, object;
            switch (type) {
              case "body":
                objects = Composite.allBodies(composite);
                break;
              case "constraint":
                objects = Composite.allConstraints(composite);
                break;
              case "composite":
                objects = Composite.allComposites(composite).concat(composite);
                break;
            }
            if (!objects)
              return null;
            object = objects.filter(function(object2) {
              return object2.id.toString() === id.toString();
            });
            return object.length === 0 ? null : object[0];
          };
          Composite.move = function(compositeA, objects, compositeB) {
            Composite.remove(compositeA, objects);
            Composite.add(compositeB, objects);
            return compositeA;
          };
          Composite.rebase = function(composite) {
            var objects = Composite.allBodies(composite).concat(Composite.allConstraints(composite)).concat(Composite.allComposites(composite));
            for (var i = 0; i < objects.length; i++) {
              objects[i].id = Common.nextId();
            }
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.translate = function(composite, translation, recursive) {
            var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0; i < bodies.length; i++) {
              Body2.translate(bodies[i], translation);
            }
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.rotate = function(composite, rotation, point, recursive) {
            var cos = Math.cos(rotation), sin = Math.sin(rotation), bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body2.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
              });
              Body2.rotate(body, rotation);
            }
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
            var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
              Body2.setPosition(body, {
                x: point.x + dx * scaleX,
                y: point.y + dy * scaleY
              });
              Body2.scale(body, scaleX, scaleY);
            }
            Composite.setModified(composite, true, true, false);
            return composite;
          };
          Composite.bounds = function(composite) {
            var bodies = Composite.allBodies(composite), vertices = [];
            for (var i = 0; i < bodies.length; i += 1) {
              var body = bodies[i];
              vertices.push(body.bounds.min, body.bounds.max);
            }
            return Bounds.create(vertices);
          };
        })();
      }, { "../core/Common": 14, "../core/Events": 16, "../geometry/Bounds": 26, "./Body": 1 }], 3: [function(_dereq_, module3, exports3) {
        var World2 = {};
        module3.exports = World2;
        var Composite = _dereq_("./Composite");
        var Constraint = _dereq_("../constraint/Constraint");
        var Common = _dereq_("../core/Common");
        (function() {
          World2.create = function(options) {
            var composite = Composite.create();
            var defaults = {
              label: "World",
              gravity: {
                x: 0,
                y: 1,
                scale: 1e-3
              },
              bounds: {
                min: { x: -Infinity, y: -Infinity },
                max: { x: Infinity, y: Infinity }
              }
            };
            return Common.extend(composite, defaults, options);
          };
        })();
      }, { "../constraint/Constraint": 12, "../core/Common": 14, "./Composite": 2 }], 4: [function(_dereq_, module3, exports3) {
        var Contact = {};
        module3.exports = Contact;
        (function() {
          Contact.create = function(vertex) {
            return {
              id: Contact.id(vertex),
              vertex,
              normalImpulse: 0,
              tangentImpulse: 0
            };
          };
          Contact.id = function(vertex) {
            return vertex.body.id + "_" + vertex.index;
          };
        })();
      }, {}], 5: [function(_dereq_, module3, exports3) {
        var Detector = {};
        module3.exports = Detector;
        var SAT = _dereq_("./SAT");
        var Pair = _dereq_("./Pair");
        var Bounds = _dereq_("../geometry/Bounds");
        (function() {
          Detector.collisions = function(broadphasePairs, engine) {
            var collisions = [], pairsTable = engine.pairs.table;
            for (var i = 0; i < broadphasePairs.length; i++) {
              var bodyA = broadphasePairs[i][0], bodyB = broadphasePairs[i][1];
              if ((bodyA.isStatic || bodyA.isSleeping) && (bodyB.isStatic || bodyB.isSleeping))
                continue;
              if (!Detector.canCollide(bodyA.collisionFilter, bodyB.collisionFilter))
                continue;
              if (Bounds.overlaps(bodyA.bounds, bodyB.bounds)) {
                for (var j = bodyA.parts.length > 1 ? 1 : 0; j < bodyA.parts.length; j++) {
                  var partA = bodyA.parts[j];
                  for (var k = bodyB.parts.length > 1 ? 1 : 0; k < bodyB.parts.length; k++) {
                    var partB = bodyB.parts[k];
                    if (partA === bodyA && partB === bodyB || Bounds.overlaps(partA.bounds, partB.bounds)) {
                      var pairId = Pair.id(partA, partB), pair = pairsTable[pairId], previousCollision;
                      if (pair && pair.isActive) {
                        previousCollision = pair.collision;
                      } else {
                        previousCollision = null;
                      }
                      var collision = SAT.collides(partA, partB, previousCollision);
                      if (collision.collided) {
                        collisions.push(collision);
                      }
                    }
                  }
                }
              }
            }
            return collisions;
          };
          Detector.canCollide = function(filterA, filterB) {
            if (filterA.group === filterB.group && filterA.group !== 0)
              return filterA.group > 0;
            return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
          };
        })();
      }, { "../geometry/Bounds": 26, "./Pair": 7, "./SAT": 11 }], 6: [function(_dereq_, module3, exports3) {
        var Grid = {};
        module3.exports = Grid;
        var Pair = _dereq_("./Pair");
        var Detector = _dereq_("./Detector");
        var Common = _dereq_("../core/Common");
        (function() {
          Grid.create = function(options) {
            var defaults = {
              controller: Grid,
              detector: Detector.collisions,
              buckets: {},
              pairs: {},
              pairsList: [],
              bucketWidth: 48,
              bucketHeight: 48
            };
            return Common.extend(defaults, options);
          };
          Grid.update = function(grid, bodies, engine, forceUpdate) {
            var i, col, row, world = engine.world, buckets = grid.buckets, bucket, bucketId, gridChanged = false;
            for (i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (body.isSleeping && !forceUpdate)
                continue;
              if (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y)
                continue;
              var newRegion = Grid._getRegion(grid, body);
              if (!body.region || newRegion.id !== body.region.id || forceUpdate) {
                if (!body.region || forceUpdate)
                  body.region = newRegion;
                var union = Grid._regionUnion(newRegion, body.region);
                for (col = union.startCol; col <= union.endCol; col++) {
                  for (row = union.startRow; row <= union.endRow; row++) {
                    bucketId = Grid._getBucketId(col, row);
                    bucket = buckets[bucketId];
                    var isInsideNewRegion = col >= newRegion.startCol && col <= newRegion.endCol && row >= newRegion.startRow && row <= newRegion.endRow;
                    var isInsideOldRegion = col >= body.region.startCol && col <= body.region.endCol && row >= body.region.startRow && row <= body.region.endRow;
                    if (!isInsideNewRegion && isInsideOldRegion) {
                      if (isInsideOldRegion) {
                        if (bucket)
                          Grid._bucketRemoveBody(grid, bucket, body);
                      }
                    }
                    if (body.region === newRegion || isInsideNewRegion && !isInsideOldRegion || forceUpdate) {
                      if (!bucket)
                        bucket = Grid._createBucket(buckets, bucketId);
                      Grid._bucketAddBody(grid, bucket, body);
                    }
                  }
                }
                body.region = newRegion;
                gridChanged = true;
              }
            }
            if (gridChanged)
              grid.pairsList = Grid._createActivePairsList(grid);
          };
          Grid.clear = function(grid) {
            grid.buckets = {};
            grid.pairs = {};
            grid.pairsList = [];
          };
          Grid._regionUnion = function(regionA, regionB) {
            var startCol = Math.min(regionA.startCol, regionB.startCol), endCol = Math.max(regionA.endCol, regionB.endCol), startRow = Math.min(regionA.startRow, regionB.startRow), endRow = Math.max(regionA.endRow, regionB.endRow);
            return Grid._createRegion(startCol, endCol, startRow, endRow);
          };
          Grid._getRegion = function(grid, body) {
            var bounds = body.bounds, startCol = Math.floor(bounds.min.x / grid.bucketWidth), endCol = Math.floor(bounds.max.x / grid.bucketWidth), startRow = Math.floor(bounds.min.y / grid.bucketHeight), endRow = Math.floor(bounds.max.y / grid.bucketHeight);
            return Grid._createRegion(startCol, endCol, startRow, endRow);
          };
          Grid._createRegion = function(startCol, endCol, startRow, endRow) {
            return {
              id: startCol + "," + endCol + "," + startRow + "," + endRow,
              startCol,
              endCol,
              startRow,
              endRow
            };
          };
          Grid._getBucketId = function(column, row) {
            return "C" + column + "R" + row;
          };
          Grid._createBucket = function(buckets, bucketId) {
            var bucket = buckets[bucketId] = [];
            return bucket;
          };
          Grid._bucketAddBody = function(grid, bucket, body) {
            for (var i = 0; i < bucket.length; i++) {
              var bodyB = bucket[i];
              if (body.id === bodyB.id || body.isStatic && bodyB.isStatic)
                continue;
              var pairId = Pair.id(body, bodyB), pair = grid.pairs[pairId];
              if (pair) {
                pair[2] += 1;
              } else {
                grid.pairs[pairId] = [body, bodyB, 1];
              }
            }
            bucket.push(body);
          };
          Grid._bucketRemoveBody = function(grid, bucket, body) {
            bucket.splice(Common.indexOf(bucket, body), 1);
            for (var i = 0; i < bucket.length; i++) {
              var bodyB = bucket[i], pairId = Pair.id(body, bodyB), pair = grid.pairs[pairId];
              if (pair)
                pair[2] -= 1;
            }
          };
          Grid._createActivePairsList = function(grid) {
            var pairKeys, pair, pairs = [];
            pairKeys = Common.keys(grid.pairs);
            for (var k = 0; k < pairKeys.length; k++) {
              pair = grid.pairs[pairKeys[k]];
              if (pair[2] > 0) {
                pairs.push(pair);
              } else {
                delete grid.pairs[pairKeys[k]];
              }
            }
            return pairs;
          };
        })();
      }, { "../core/Common": 14, "./Detector": 5, "./Pair": 7 }], 7: [function(_dereq_, module3, exports3) {
        var Pair = {};
        module3.exports = Pair;
        var Contact = _dereq_("./Contact");
        (function() {
          Pair.create = function(collision, timestamp) {
            var bodyA = collision.bodyA, bodyB = collision.bodyB, parentA = collision.parentA, parentB = collision.parentB;
            var pair = {
              id: Pair.id(bodyA, bodyB),
              bodyA,
              bodyB,
              contacts: {},
              activeContacts: [],
              separation: 0,
              isActive: true,
              isSensor: bodyA.isSensor || bodyB.isSensor,
              timeCreated: timestamp,
              timeUpdated: timestamp,
              inverseMass: parentA.inverseMass + parentB.inverseMass,
              friction: Math.min(parentA.friction, parentB.friction),
              frictionStatic: Math.max(parentA.frictionStatic, parentB.frictionStatic),
              restitution: Math.max(parentA.restitution, parentB.restitution),
              slop: Math.max(parentA.slop, parentB.slop)
            };
            Pair.update(pair, collision, timestamp);
            return pair;
          };
          Pair.update = function(pair, collision, timestamp) {
            var contacts = pair.contacts, supports = collision.supports, activeContacts = pair.activeContacts, parentA = collision.parentA, parentB = collision.parentB;
            pair.collision = collision;
            pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
            pair.friction = Math.min(parentA.friction, parentB.friction);
            pair.frictionStatic = Math.max(parentA.frictionStatic, parentB.frictionStatic);
            pair.restitution = Math.max(parentA.restitution, parentB.restitution);
            pair.slop = Math.max(parentA.slop, parentB.slop);
            activeContacts.length = 0;
            if (collision.collided) {
              for (var i = 0; i < supports.length; i++) {
                var support = supports[i], contactId = Contact.id(support), contact = contacts[contactId];
                if (contact) {
                  activeContacts.push(contact);
                } else {
                  activeContacts.push(contacts[contactId] = Contact.create(support));
                }
              }
              pair.separation = collision.depth;
              Pair.setActive(pair, true, timestamp);
            } else {
              if (pair.isActive === true)
                Pair.setActive(pair, false, timestamp);
            }
          };
          Pair.setActive = function(pair, isActive, timestamp) {
            if (isActive) {
              pair.isActive = true;
              pair.timeUpdated = timestamp;
            } else {
              pair.isActive = false;
              pair.activeContacts.length = 0;
            }
          };
          Pair.id = function(bodyA, bodyB) {
            if (bodyA.id < bodyB.id) {
              return "A" + bodyA.id + "B" + bodyB.id;
            } else {
              return "A" + bodyB.id + "B" + bodyA.id;
            }
          };
        })();
      }, { "./Contact": 4 }], 8: [function(_dereq_, module3, exports3) {
        var Pairs = {};
        module3.exports = Pairs;
        var Pair = _dereq_("./Pair");
        var Common = _dereq_("../core/Common");
        (function() {
          Pairs._pairMaxIdleLife = 1e3;
          Pairs.create = function(options) {
            return Common.extend({
              table: {},
              list: [],
              collisionStart: [],
              collisionActive: [],
              collisionEnd: []
            }, options);
          };
          Pairs.update = function(pairs, collisions, timestamp) {
            var pairsList = pairs.list, pairsTable = pairs.table, collisionStart = pairs.collisionStart, collisionEnd = pairs.collisionEnd, collisionActive = pairs.collisionActive, activePairIds = [], collision, pairId, pair, i;
            collisionStart.length = 0;
            collisionEnd.length = 0;
            collisionActive.length = 0;
            for (i = 0; i < collisions.length; i++) {
              collision = collisions[i];
              if (collision.collided) {
                pairId = Pair.id(collision.bodyA, collision.bodyB);
                activePairIds.push(pairId);
                pair = pairsTable[pairId];
                if (pair) {
                  if (pair.isActive) {
                    collisionActive.push(pair);
                  } else {
                    collisionStart.push(pair);
                  }
                  Pair.update(pair, collision, timestamp);
                } else {
                  pair = Pair.create(collision, timestamp);
                  pairsTable[pairId] = pair;
                  collisionStart.push(pair);
                  pairsList.push(pair);
                }
              }
            }
            for (i = 0; i < pairsList.length; i++) {
              pair = pairsList[i];
              if (pair.isActive && Common.indexOf(activePairIds, pair.id) === -1) {
                Pair.setActive(pair, false, timestamp);
                collisionEnd.push(pair);
              }
            }
          };
          Pairs.removeOld = function(pairs, timestamp) {
            var pairsList = pairs.list, pairsTable = pairs.table, indexesToRemove = [], pair, collision, pairIndex, i;
            for (i = 0; i < pairsList.length; i++) {
              pair = pairsList[i];
              collision = pair.collision;
              if (collision.bodyA.isSleeping || collision.bodyB.isSleeping) {
                pair.timeUpdated = timestamp;
                continue;
              }
              if (timestamp - pair.timeUpdated > Pairs._pairMaxIdleLife) {
                indexesToRemove.push(i);
              }
            }
            for (i = 0; i < indexesToRemove.length; i++) {
              pairIndex = indexesToRemove[i] - i;
              pair = pairsList[pairIndex];
              delete pairsTable[pair.id];
              pairsList.splice(pairIndex, 1);
            }
          };
          Pairs.clear = function(pairs) {
            pairs.table = {};
            pairs.list.length = 0;
            pairs.collisionStart.length = 0;
            pairs.collisionActive.length = 0;
            pairs.collisionEnd.length = 0;
            return pairs;
          };
        })();
      }, { "../core/Common": 14, "./Pair": 7 }], 9: [function(_dereq_, module3, exports3) {
        var Query = {};
        module3.exports = Query;
        var Vector = _dereq_("../geometry/Vector");
        var SAT = _dereq_("./SAT");
        var Bounds = _dereq_("../geometry/Bounds");
        var Bodies2 = _dereq_("../factory/Bodies");
        var Vertices = _dereq_("../geometry/Vertices");
        (function() {
          Query.collides = function(body, bodies) {
            var collisions = [];
            for (var i = 0; i < bodies.length; i++) {
              var bodyA = bodies[i];
              if (Bounds.overlaps(bodyA.bounds, body.bounds)) {
                for (var j = bodyA.parts.length === 1 ? 0 : 1; j < bodyA.parts.length; j++) {
                  var part = bodyA.parts[j];
                  if (Bounds.overlaps(part.bounds, body.bounds)) {
                    var collision = SAT.collides(part, body);
                    if (collision.collided) {
                      collisions.push(collision);
                      break;
                    }
                  }
                }
              }
            }
            return collisions;
          };
          Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
            rayWidth = rayWidth || 1e-100;
            var rayAngle = Vector.angle(startPoint, endPoint), rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)), rayX = (endPoint.x + startPoint.x) * 0.5, rayY = (endPoint.y + startPoint.y) * 0.5, ray = Bodies2.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }), collisions = Query.collides(ray, bodies);
            for (var i = 0; i < collisions.length; i += 1) {
              var collision = collisions[i];
              collision.body = collision.bodyB = collision.bodyA;
            }
            return collisions;
          };
          Query.region = function(bodies, bounds, outside) {
            var result = [];
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], overlaps = Bounds.overlaps(body.bounds, bounds);
              if (overlaps && !outside || !overlaps && outside)
                result.push(body);
            }
            return result;
          };
          Query.point = function(bodies, point) {
            var result = [];
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (Bounds.contains(body.bounds, point)) {
                for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
                  var part = body.parts[j];
                  if (Bounds.contains(part.bounds, point) && Vertices.contains(part.vertices, point)) {
                    result.push(body);
                    break;
                  }
                }
              }
            }
            return result;
          };
        })();
      }, { "../factory/Bodies": 23, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29, "./SAT": 11 }], 10: [function(_dereq_, module3, exports3) {
        var Resolver = {};
        module3.exports = Resolver;
        var Vertices = _dereq_("../geometry/Vertices");
        var Vector = _dereq_("../geometry/Vector");
        var Common = _dereq_("../core/Common");
        var Bounds = _dereq_("../geometry/Bounds");
        (function() {
          Resolver._restingThresh = 4;
          Resolver._restingThreshTangent = 6;
          Resolver._positionDampen = 0.9;
          Resolver._positionWarming = 0.8;
          Resolver._frictionNormalMultiplier = 5;
          Resolver.preSolvePosition = function(pairs) {
            var i, pair, activeCount;
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              activeCount = pair.activeContacts.length;
              pair.collision.parentA.totalContacts += activeCount;
              pair.collision.parentB.totalContacts += activeCount;
            }
          };
          Resolver.solvePosition = function(pairs, timeScale) {
            var i, pair, collision, bodyA, bodyB, normal, bodyBtoA, contactShare, positionImpulse, contactCount = {}, tempA = Vector._temp[0], tempB = Vector._temp[1], tempC = Vector._temp[2], tempD = Vector._temp[3];
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              collision = pair.collision;
              bodyA = collision.parentA;
              bodyB = collision.parentB;
              normal = collision.normal;
              bodyBtoA = Vector.sub(
                Vector.add(bodyB.positionImpulse, bodyB.position, tempA),
                Vector.add(
                  bodyA.positionImpulse,
                  Vector.sub(bodyB.position, collision.penetration, tempB),
                  tempC
                ),
                tempD
              );
              pair.separation = Vector.dot(normal, bodyBtoA);
            }
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              collision = pair.collision;
              bodyA = collision.parentA;
              bodyB = collision.parentB;
              normal = collision.normal;
              positionImpulse = (pair.separation - pair.slop) * timeScale;
              if (bodyA.isStatic || bodyB.isStatic)
                positionImpulse *= 2;
              if (!(bodyA.isStatic || bodyA.isSleeping)) {
                contactShare = Resolver._positionDampen / bodyA.totalContacts;
                bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
              }
              if (!(bodyB.isStatic || bodyB.isSleeping)) {
                contactShare = Resolver._positionDampen / bodyB.totalContacts;
                bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
              }
            }
          };
          Resolver.postSolvePosition = function(bodies) {
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              body.totalContacts = 0;
              if (body.positionImpulse.x !== 0 || body.positionImpulse.y !== 0) {
                for (var j = 0; j < body.parts.length; j++) {
                  var part = body.parts[j];
                  Vertices.translate(part.vertices, body.positionImpulse);
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                  part.position.x += body.positionImpulse.x;
                  part.position.y += body.positionImpulse.y;
                }
                body.positionPrev.x += body.positionImpulse.x;
                body.positionPrev.y += body.positionImpulse.y;
                if (Vector.dot(body.positionImpulse, body.velocity) < 0) {
                  body.positionImpulse.x = 0;
                  body.positionImpulse.y = 0;
                } else {
                  body.positionImpulse.x *= Resolver._positionWarming;
                  body.positionImpulse.y *= Resolver._positionWarming;
                }
              }
            }
          };
          Resolver.preSolveVelocity = function(pairs) {
            var i, j, pair, contacts, collision, bodyA, bodyB, normal, tangent, contact, contactVertex, normalImpulse, tangentImpulse, offset, impulse = Vector._temp[0], tempA = Vector._temp[1];
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              contacts = pair.activeContacts;
              collision = pair.collision;
              bodyA = collision.parentA;
              bodyB = collision.parentB;
              normal = collision.normal;
              tangent = collision.tangent;
              for (j = 0; j < contacts.length; j++) {
                contact = contacts[j];
                contactVertex = contact.vertex;
                normalImpulse = contact.normalImpulse;
                tangentImpulse = contact.tangentImpulse;
                if (normalImpulse !== 0 || tangentImpulse !== 0) {
                  impulse.x = normal.x * normalImpulse + tangent.x * tangentImpulse;
                  impulse.y = normal.y * normalImpulse + tangent.y * tangentImpulse;
                  if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    offset = Vector.sub(contactVertex, bodyA.position, tempA);
                    bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                    bodyA.anglePrev += Vector.cross(offset, impulse) * bodyA.inverseInertia;
                  }
                  if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    offset = Vector.sub(contactVertex, bodyB.position, tempA);
                    bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                    bodyB.anglePrev -= Vector.cross(offset, impulse) * bodyB.inverseInertia;
                  }
                }
              }
            }
          };
          Resolver.solveVelocity = function(pairs, timeScale) {
            var timeScaleSquared = timeScale * timeScale, impulse = Vector._temp[0], tempA = Vector._temp[1], tempB = Vector._temp[2], tempC = Vector._temp[3], tempD = Vector._temp[4], tempE = Vector._temp[5];
            for (var i = 0; i < pairs.length; i++) {
              var pair = pairs[i];
              if (!pair.isActive || pair.isSensor)
                continue;
              var collision = pair.collision, bodyA = collision.parentA, bodyB = collision.parentB, normal = collision.normal, tangent = collision.tangent, contacts = pair.activeContacts, contactShare = 1 / contacts.length;
              bodyA.velocity.x = bodyA.position.x - bodyA.positionPrev.x;
              bodyA.velocity.y = bodyA.position.y - bodyA.positionPrev.y;
              bodyB.velocity.x = bodyB.position.x - bodyB.positionPrev.x;
              bodyB.velocity.y = bodyB.position.y - bodyB.positionPrev.y;
              bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
              bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;
              for (var j = 0; j < contacts.length; j++) {
                var contact = contacts[j], contactVertex = contact.vertex, offsetA = Vector.sub(contactVertex, bodyA.position, tempA), offsetB = Vector.sub(contactVertex, bodyB.position, tempB), velocityPointA = Vector.add(bodyA.velocity, Vector.mult(Vector.perp(offsetA), bodyA.angularVelocity), tempC), velocityPointB = Vector.add(bodyB.velocity, Vector.mult(Vector.perp(offsetB), bodyB.angularVelocity), tempD), relativeVelocity = Vector.sub(velocityPointA, velocityPointB, tempE), normalVelocity = Vector.dot(normal, relativeVelocity);
                var tangentVelocity = Vector.dot(tangent, relativeVelocity), tangentSpeed = Math.abs(tangentVelocity), tangentVelocityDirection = Common.sign(tangentVelocity);
                var normalImpulse = (1 + pair.restitution) * normalVelocity, normalForce = Common.clamp(pair.separation + normalVelocity, 0, 1) * Resolver._frictionNormalMultiplier;
                var tangentImpulse = tangentVelocity, maxFriction = Infinity;
                if (tangentSpeed > pair.friction * pair.frictionStatic * normalForce * timeScaleSquared) {
                  maxFriction = tangentSpeed;
                  tangentImpulse = Common.clamp(
                    pair.friction * tangentVelocityDirection * timeScaleSquared,
                    -maxFriction,
                    maxFriction
                  );
                }
                var oAcN = Vector.cross(offsetA, normal), oBcN = Vector.cross(offsetB, normal), share = contactShare / (bodyA.inverseMass + bodyB.inverseMass + bodyA.inverseInertia * oAcN * oAcN + bodyB.inverseInertia * oBcN * oBcN);
                normalImpulse *= share;
                tangentImpulse *= share;
                if (normalVelocity < 0 && normalVelocity * normalVelocity > Resolver._restingThresh * timeScaleSquared) {
                  contact.normalImpulse = 0;
                } else {
                  var contactNormalImpulse = contact.normalImpulse;
                  contact.normalImpulse = Math.min(contact.normalImpulse + normalImpulse, 0);
                  normalImpulse = contact.normalImpulse - contactNormalImpulse;
                }
                if (tangentVelocity * tangentVelocity > Resolver._restingThreshTangent * timeScaleSquared) {
                  contact.tangentImpulse = 0;
                } else {
                  var contactTangentImpulse = contact.tangentImpulse;
                  contact.tangentImpulse = Common.clamp(contact.tangentImpulse + tangentImpulse, -maxFriction, maxFriction);
                  tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                }
                impulse.x = normal.x * normalImpulse + tangent.x * tangentImpulse;
                impulse.y = normal.y * normalImpulse + tangent.y * tangentImpulse;
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                  bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                  bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                  bodyA.anglePrev += Vector.cross(offsetA, impulse) * bodyA.inverseInertia;
                }
                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                  bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                  bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                  bodyB.anglePrev -= Vector.cross(offsetB, impulse) * bodyB.inverseInertia;
                }
              }
            }
          };
        })();
      }, { "../core/Common": 14, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 11: [function(_dereq_, module3, exports3) {
        var SAT = {};
        module3.exports = SAT;
        var Vertices = _dereq_("../geometry/Vertices");
        var Vector = _dereq_("../geometry/Vector");
        (function() {
          SAT.collides = function(bodyA, bodyB, previousCollision) {
            var overlapAB, overlapBA, minOverlap, collision, canReusePrevCol = false;
            if (previousCollision) {
              var parentA = bodyA.parent, parentB = bodyB.parent, motion = parentA.speed * parentA.speed + parentA.angularSpeed * parentA.angularSpeed + parentB.speed * parentB.speed + parentB.angularSpeed * parentB.angularSpeed;
              canReusePrevCol = previousCollision && previousCollision.collided && motion < 0.2;
              collision = previousCollision;
            } else {
              collision = { collided: false, bodyA, bodyB };
            }
            if (previousCollision && canReusePrevCol) {
              var axisBodyA = collision.axisBody, axisBodyB = axisBodyA === bodyA ? bodyB : bodyA, axes = [axisBodyA.axes[previousCollision.axisNumber]];
              minOverlap = SAT._overlapAxes(axisBodyA.vertices, axisBodyB.vertices, axes);
              collision.reused = true;
              if (minOverlap.overlap <= 0) {
                collision.collided = false;
                return collision;
              }
            } else {
              overlapAB = SAT._overlapAxes(bodyA.vertices, bodyB.vertices, bodyA.axes);
              if (overlapAB.overlap <= 0) {
                collision.collided = false;
                return collision;
              }
              overlapBA = SAT._overlapAxes(bodyB.vertices, bodyA.vertices, bodyB.axes);
              if (overlapBA.overlap <= 0) {
                collision.collided = false;
                return collision;
              }
              if (overlapAB.overlap < overlapBA.overlap) {
                minOverlap = overlapAB;
                collision.axisBody = bodyA;
              } else {
                minOverlap = overlapBA;
                collision.axisBody = bodyB;
              }
              collision.axisNumber = minOverlap.axisNumber;
            }
            collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
            collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
            collision.collided = true;
            collision.depth = minOverlap.overlap;
            collision.parentA = collision.bodyA.parent;
            collision.parentB = collision.bodyB.parent;
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;
            if (Vector.dot(minOverlap.axis, Vector.sub(bodyB.position, bodyA.position)) < 0) {
              collision.normal = {
                x: minOverlap.axis.x,
                y: minOverlap.axis.y
              };
            } else {
              collision.normal = {
                x: -minOverlap.axis.x,
                y: -minOverlap.axis.y
              };
            }
            collision.tangent = Vector.perp(collision.normal);
            collision.penetration = collision.penetration || {};
            collision.penetration.x = collision.normal.x * collision.depth;
            collision.penetration.y = collision.normal.y * collision.depth;
            var verticesB = SAT._findSupports(bodyA, bodyB, collision.normal), supports = [];
            if (Vertices.contains(bodyA.vertices, verticesB[0]))
              supports.push(verticesB[0]);
            if (Vertices.contains(bodyA.vertices, verticesB[1]))
              supports.push(verticesB[1]);
            if (supports.length < 2) {
              var verticesA = SAT._findSupports(bodyB, bodyA, Vector.neg(collision.normal));
              if (Vertices.contains(bodyB.vertices, verticesA[0]))
                supports.push(verticesA[0]);
              if (supports.length < 2 && Vertices.contains(bodyB.vertices, verticesA[1]))
                supports.push(verticesA[1]);
            }
            if (supports.length < 1)
              supports = [verticesB[0]];
            collision.supports = supports;
            return collision;
          };
          SAT._overlapAxes = function(verticesA, verticesB, axes) {
            var projectionA = Vector._temp[0], projectionB = Vector._temp[1], result = { overlap: Number.MAX_VALUE }, overlap, axis;
            for (var i = 0; i < axes.length; i++) {
              axis = axes[i];
              SAT._projectToAxis(projectionA, verticesA, axis);
              SAT._projectToAxis(projectionB, verticesB, axis);
              overlap = Math.min(projectionA.max - projectionB.min, projectionB.max - projectionA.min);
              if (overlap <= 0) {
                result.overlap = overlap;
                return result;
              }
              if (overlap < result.overlap) {
                result.overlap = overlap;
                result.axis = axis;
                result.axisNumber = i;
              }
            }
            return result;
          };
          SAT._projectToAxis = function(projection, vertices, axis) {
            var min = Vector.dot(vertices[0], axis), max = min;
            for (var i = 1; i < vertices.length; i += 1) {
              var dot = Vector.dot(vertices[i], axis);
              if (dot > max) {
                max = dot;
              } else if (dot < min) {
                min = dot;
              }
            }
            projection.min = min;
            projection.max = max;
          };
          SAT._findSupports = function(bodyA, bodyB, normal) {
            var nearestDistance = Number.MAX_VALUE, vertexToBody = Vector._temp[0], vertices = bodyB.vertices, bodyAPosition = bodyA.position, distance, vertex, vertexA, vertexB;
            for (var i = 0; i < vertices.length; i++) {
              vertex = vertices[i];
              vertexToBody.x = vertex.x - bodyAPosition.x;
              vertexToBody.y = vertex.y - bodyAPosition.y;
              distance = -Vector.dot(normal, vertexToBody);
              if (distance < nearestDistance) {
                nearestDistance = distance;
                vertexA = vertex;
              }
            }
            var prevIndex = vertexA.index - 1 >= 0 ? vertexA.index - 1 : vertices.length - 1;
            vertex = vertices[prevIndex];
            vertexToBody.x = vertex.x - bodyAPosition.x;
            vertexToBody.y = vertex.y - bodyAPosition.y;
            nearestDistance = -Vector.dot(normal, vertexToBody);
            vertexB = vertex;
            var nextIndex = (vertexA.index + 1) % vertices.length;
            vertex = vertices[nextIndex];
            vertexToBody.x = vertex.x - bodyAPosition.x;
            vertexToBody.y = vertex.y - bodyAPosition.y;
            distance = -Vector.dot(normal, vertexToBody);
            if (distance < nearestDistance) {
              vertexB = vertex;
            }
            return [vertexA, vertexB];
          };
        })();
      }, { "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 12: [function(_dereq_, module3, exports3) {
        var Constraint = {};
        module3.exports = Constraint;
        var Vertices = _dereq_("../geometry/Vertices");
        var Vector = _dereq_("../geometry/Vector");
        var Sleeping = _dereq_("../core/Sleeping");
        var Bounds = _dereq_("../geometry/Bounds");
        var Axes = _dereq_("../geometry/Axes");
        var Common = _dereq_("../core/Common");
        (function() {
          Constraint._warming = 0.4;
          Constraint._torqueDampen = 1;
          Constraint._minLength = 1e-6;
          Constraint.create = function(options) {
            var constraint = options;
            if (constraint.bodyA && !constraint.pointA)
              constraint.pointA = { x: 0, y: 0 };
            if (constraint.bodyB && !constraint.pointB)
              constraint.pointB = { x: 0, y: 0 };
            var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA, initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB, length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));
            constraint.length = typeof constraint.length !== "undefined" ? constraint.length : length;
            constraint.id = constraint.id || Common.nextId();
            constraint.label = constraint.label || "Constraint";
            constraint.type = "constraint";
            constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
            constraint.damping = constraint.damping || 0;
            constraint.angularStiffness = constraint.angularStiffness || 0;
            constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
            constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
            constraint.plugin = {};
            var render = {
              visible: true,
              lineWidth: 2,
              strokeStyle: "#ffffff",
              type: "line",
              anchors: true
            };
            if (constraint.length === 0 && constraint.stiffness > 0.1) {
              render.type = "pin";
              render.anchors = false;
            } else if (constraint.stiffness < 0.9) {
              render.type = "spring";
            }
            constraint.render = Common.extend(render, constraint.render);
            return constraint;
          };
          Constraint.preSolveAll = function(bodies) {
            for (var i = 0; i < bodies.length; i += 1) {
              var body = bodies[i], impulse = body.constraintImpulse;
              if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                continue;
              }
              body.position.x += impulse.x;
              body.position.y += impulse.y;
              body.angle += impulse.angle;
            }
          };
          Constraint.solveAll = function(constraints, timeScale) {
            for (var i = 0; i < constraints.length; i += 1) {
              var constraint = constraints[i], fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic, fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
              if (fixedA || fixedB) {
                Constraint.solve(constraints[i], timeScale);
              }
            }
            for (i = 0; i < constraints.length; i += 1) {
              constraint = constraints[i];
              fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic;
              fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
              if (!fixedA && !fixedB) {
                Constraint.solve(constraints[i], timeScale);
              }
            }
          };
          Constraint.solve = function(constraint, timeScale) {
            var bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointA = constraint.pointA, pointB = constraint.pointB;
            if (!bodyA && !bodyB)
              return;
            if (bodyA && !bodyA.isStatic) {
              Vector.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
              constraint.angleA = bodyA.angle;
            }
            if (bodyB && !bodyB.isStatic) {
              Vector.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
              constraint.angleB = bodyB.angle;
            }
            var pointAWorld = pointA, pointBWorld = pointB;
            if (bodyA) pointAWorld = Vector.add(bodyA.position, pointA);
            if (bodyB) pointBWorld = Vector.add(bodyB.position, pointB);
            if (!pointAWorld || !pointBWorld)
              return;
            var delta = Vector.sub(pointAWorld, pointBWorld), currentLength = Vector.magnitude(delta);
            if (currentLength < Constraint._minLength) {
              currentLength = Constraint._minLength;
            }
            var difference = (currentLength - constraint.length) / currentLength, stiffness = constraint.stiffness < 1 ? constraint.stiffness * timeScale : constraint.stiffness, force = Vector.mult(delta, difference * stiffness), massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0), inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0), resistanceTotal = massTotal + inertiaTotal, torque, share, normal, normalVelocity, relativeVelocity;
            if (constraint.damping) {
              var zero = Vector.create();
              normal = Vector.div(delta, currentLength);
              relativeVelocity = Vector.sub(
                bodyB && Vector.sub(bodyB.position, bodyB.positionPrev) || zero,
                bodyA && Vector.sub(bodyA.position, bodyA.positionPrev) || zero
              );
              normalVelocity = Vector.dot(normal, relativeVelocity);
            }
            if (bodyA && !bodyA.isStatic) {
              share = bodyA.inverseMass / massTotal;
              bodyA.constraintImpulse.x -= force.x * share;
              bodyA.constraintImpulse.y -= force.y * share;
              bodyA.position.x -= force.x * share;
              bodyA.position.y -= force.y * share;
              if (constraint.damping) {
                bodyA.positionPrev.x -= constraint.damping * normal.x * normalVelocity * share;
                bodyA.positionPrev.y -= constraint.damping * normal.y * normalVelocity * share;
              }
              torque = Vector.cross(pointA, force) / resistanceTotal * Constraint._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
              bodyA.constraintImpulse.angle -= torque;
              bodyA.angle -= torque;
            }
            if (bodyB && !bodyB.isStatic) {
              share = bodyB.inverseMass / massTotal;
              bodyB.constraintImpulse.x += force.x * share;
              bodyB.constraintImpulse.y += force.y * share;
              bodyB.position.x += force.x * share;
              bodyB.position.y += force.y * share;
              if (constraint.damping) {
                bodyB.positionPrev.x += constraint.damping * normal.x * normalVelocity * share;
                bodyB.positionPrev.y += constraint.damping * normal.y * normalVelocity * share;
              }
              torque = Vector.cross(pointB, force) / resistanceTotal * Constraint._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
              bodyB.constraintImpulse.angle += torque;
              bodyB.angle += torque;
            }
          };
          Constraint.postSolveAll = function(bodies) {
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], impulse = body.constraintImpulse;
              if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                continue;
              }
              Sleeping.set(body, false);
              for (var j = 0; j < body.parts.length; j++) {
                var part = body.parts[j];
                Vertices.translate(part.vertices, impulse);
                if (j > 0) {
                  part.position.x += impulse.x;
                  part.position.y += impulse.y;
                }
                if (impulse.angle !== 0) {
                  Vertices.rotate(part.vertices, impulse.angle, body.position);
                  Axes.rotate(part.axes, impulse.angle);
                  if (j > 0) {
                    Vector.rotateAbout(part.position, impulse.angle, body.position, part.position);
                  }
                }
                Bounds.update(part.bounds, part.vertices, body.velocity);
              }
              impulse.angle *= Constraint._warming;
              impulse.x *= Constraint._warming;
              impulse.y *= Constraint._warming;
            }
          };
        })();
      }, { "../core/Common": 14, "../core/Sleeping": 22, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 13: [function(_dereq_, module3, exports3) {
        var MouseConstraint2 = {};
        module3.exports = MouseConstraint2;
        var Vertices = _dereq_("../geometry/Vertices");
        var Sleeping = _dereq_("../core/Sleeping");
        var Mouse2 = _dereq_("../core/Mouse");
        var Events2 = _dereq_("../core/Events");
        var Detector = _dereq_("../collision/Detector");
        var Constraint = _dereq_("./Constraint");
        var Composite = _dereq_("../body/Composite");
        var Common = _dereq_("../core/Common");
        var Bounds = _dereq_("../geometry/Bounds");
        (function() {
          MouseConstraint2.create = function(engine, options) {
            var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);
            if (!mouse) {
              if (engine && engine.render && engine.render.canvas) {
                mouse = Mouse2.create(engine.render.canvas);
              } else if (options && options.element) {
                mouse = Mouse2.create(options.element);
              } else {
                mouse = Mouse2.create();
                Common.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected");
              }
            }
            var constraint = Constraint.create({
              label: "Mouse Constraint",
              pointA: mouse.position,
              pointB: { x: 0, y: 0 },
              length: 0.01,
              stiffness: 0.1,
              angularStiffness: 1,
              render: {
                strokeStyle: "#90EE90",
                lineWidth: 3
              }
            });
            var defaults = {
              type: "mouseConstraint",
              mouse,
              element: null,
              body: null,
              constraint,
              collisionFilter: {
                category: 1,
                mask: 4294967295,
                group: 0
              }
            };
            var mouseConstraint = Common.extend(defaults, options);
            Events2.on(engine, "beforeUpdate", function() {
              var allBodies = Composite.allBodies(engine.world);
              MouseConstraint2.update(mouseConstraint, allBodies);
              MouseConstraint2._triggerEvents(mouseConstraint);
            });
            return mouseConstraint;
          };
          MouseConstraint2.update = function(mouseConstraint, bodies) {
            var mouse = mouseConstraint.mouse, constraint = mouseConstraint.constraint, body = mouseConstraint.body;
            if (mouse.button === 0) {
              if (!constraint.bodyB) {
                for (var i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (Bounds.contains(body.bounds, mouse.position) && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                    for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
                      var part = body.parts[j];
                      if (Vertices.contains(part.vertices, mouse.position)) {
                        constraint.pointA = mouse.position;
                        constraint.bodyB = mouseConstraint.body = body;
                        constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                        constraint.angleB = body.angle;
                        Sleeping.set(body, false);
                        Events2.trigger(mouseConstraint, "startdrag", { mouse, body });
                        break;
                      }
                    }
                  }
                }
              } else {
                Sleeping.set(constraint.bodyB, false);
                constraint.pointA = mouse.position;
              }
            } else {
              constraint.bodyB = mouseConstraint.body = null;
              constraint.pointB = null;
              if (body)
                Events2.trigger(mouseConstraint, "enddrag", { mouse, body });
            }
          };
          MouseConstraint2._triggerEvents = function(mouseConstraint) {
            var mouse = mouseConstraint.mouse, mouseEvents = mouse.sourceEvents;
            if (mouseEvents.mousemove)
              Events2.trigger(mouseConstraint, "mousemove", { mouse });
            if (mouseEvents.mousedown)
              Events2.trigger(mouseConstraint, "mousedown", { mouse });
            if (mouseEvents.mouseup)
              Events2.trigger(mouseConstraint, "mouseup", { mouse });
            Mouse2.clearSourceEvents(mouse);
          };
        })();
      }, { "../body/Composite": 2, "../collision/Detector": 5, "../core/Common": 14, "../core/Events": 16, "../core/Mouse": 19, "../core/Sleeping": 22, "../geometry/Bounds": 26, "../geometry/Vertices": 29, "./Constraint": 12 }], 14: [function(_dereq_, module3, exports3) {
        (function(global2) {
          var Common = {};
          module3.exports = Common;
          (function() {
            Common._nextId = 0;
            Common._seed = 0;
            Common._nowStartTime = +/* @__PURE__ */ new Date();
            Common.extend = function(obj, deep) {
              var argsStart, args, deepClone;
              if (typeof deep === "boolean") {
                argsStart = 2;
                deepClone = deep;
              } else {
                argsStart = 1;
                deepClone = true;
              }
              for (var i = argsStart; i < arguments.length; i++) {
                var source = arguments[i];
                if (source) {
                  for (var prop in source) {
                    if (deepClone && source[prop] && source[prop].constructor === Object) {
                      if (!obj[prop] || obj[prop].constructor === Object) {
                        obj[prop] = obj[prop] || {};
                        Common.extend(obj[prop], deepClone, source[prop]);
                      } else {
                        obj[prop] = source[prop];
                      }
                    } else {
                      obj[prop] = source[prop];
                    }
                  }
                }
              }
              return obj;
            };
            Common.clone = function(obj, deep) {
              return Common.extend({}, deep, obj);
            };
            Common.keys = function(obj) {
              if (Object.keys)
                return Object.keys(obj);
              var keys = [];
              for (var key in obj)
                keys.push(key);
              return keys;
            };
            Common.values = function(obj) {
              var values = [];
              if (Object.keys) {
                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                  values.push(obj[keys[i]]);
                }
                return values;
              }
              for (var key in obj)
                values.push(obj[key]);
              return values;
            };
            Common.get = function(obj, path, begin, end) {
              path = path.split(".").slice(begin, end);
              for (var i = 0; i < path.length; i += 1) {
                obj = obj[path[i]];
              }
              return obj;
            };
            Common.set = function(obj, path, val, begin, end) {
              var parts = path.split(".").slice(begin, end);
              Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
              return val;
            };
            Common.shuffle = function(array) {
              for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Common.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
              }
              return array;
            };
            Common.choose = function(choices) {
              return choices[Math.floor(Common.random() * choices.length)];
            };
            Common.isElement = function(obj) {
              if (typeof HTMLElement !== "undefined") {
                return obj instanceof HTMLElement;
              }
              return !!(obj && obj.nodeType && obj.nodeName);
            };
            Common.isArray = function(obj) {
              return Object.prototype.toString.call(obj) === "[object Array]";
            };
            Common.isFunction = function(obj) {
              return typeof obj === "function";
            };
            Common.isPlainObject = function(obj) {
              return typeof obj === "object" && obj.constructor === Object;
            };
            Common.isString = function(obj) {
              return toString.call(obj) === "[object String]";
            };
            Common.clamp = function(value, min, max) {
              if (value < min)
                return min;
              if (value > max)
                return max;
              return value;
            };
            Common.sign = function(value) {
              return value < 0 ? -1 : 1;
            };
            Common.now = function() {
              if (window.performance) {
                if (window.performance.now) {
                  return window.performance.now();
                } else if (window.performance.webkitNow) {
                  return window.performance.webkitNow();
                }
              }
              return /* @__PURE__ */ new Date() - Common._nowStartTime;
            };
            Common.random = function(min, max) {
              min = typeof min !== "undefined" ? min : 0;
              max = typeof max !== "undefined" ? max : 1;
              return min + _seededRandom() * (max - min);
            };
            var _seededRandom = function() {
              Common._seed = (Common._seed * 9301 + 49297) % 233280;
              return Common._seed / 233280;
            };
            Common.colorToNumber = function(colorString) {
              colorString = colorString.replace("#", "");
              if (colorString.length == 3) {
                colorString = colorString.charAt(0) + colorString.charAt(0) + colorString.charAt(1) + colorString.charAt(1) + colorString.charAt(2) + colorString.charAt(2);
              }
              return parseInt(colorString, 16);
            };
            Common.logLevel = 1;
            Common.log = function() {
              if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
                console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
              }
            };
            Common.info = function() {
              if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
                console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
              }
            };
            Common.warn = function() {
              if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
                console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
              }
            };
            Common.nextId = function() {
              return Common._nextId++;
            };
            Common.indexOf = function(haystack, needle) {
              if (haystack.indexOf)
                return haystack.indexOf(needle);
              for (var i = 0; i < haystack.length; i++) {
                if (haystack[i] === needle)
                  return i;
              }
              return -1;
            };
            Common.map = function(list, func) {
              if (list.map) {
                return list.map(func);
              }
              var mapped = [];
              for (var i = 0; i < list.length; i += 1) {
                mapped.push(func(list[i]));
              }
              return mapped;
            };
            Common.topologicalSort = function(graph) {
              var result = [], visited = [], temp = [];
              for (var node in graph) {
                if (!visited[node] && !temp[node]) {
                  Common._topologicalSort(node, visited, temp, graph, result);
                }
              }
              return result;
            };
            Common._topologicalSort = function(node, visited, temp, graph, result) {
              var neighbors = graph[node] || [];
              temp[node] = true;
              for (var i = 0; i < neighbors.length; i += 1) {
                var neighbor = neighbors[i];
                if (temp[neighbor]) {
                  continue;
                }
                if (!visited[neighbor]) {
                  Common._topologicalSort(neighbor, visited, temp, graph, result);
                }
              }
              temp[node] = false;
              visited[node] = true;
              result.push(node);
            };
            Common.chain = function() {
              var funcs = [];
              for (var i = 0; i < arguments.length; i += 1) {
                var func = arguments[i];
                if (func._chained) {
                  funcs.push.apply(funcs, func._chained);
                } else {
                  funcs.push(func);
                }
              }
              var chain = function() {
                var lastResult, args = new Array(arguments.length);
                for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
                  args[i2] = arguments[i2];
                }
                for (i2 = 0; i2 < funcs.length; i2 += 1) {
                  var result = funcs[i2].apply(lastResult, args);
                  if (typeof result !== "undefined") {
                    lastResult = result;
                  }
                }
                return lastResult;
              };
              chain._chained = funcs;
              return chain;
            };
            Common.chainPathBefore = function(base, path, func) {
              return Common.set(base, path, Common.chain(
                func,
                Common.get(base, path)
              ));
            };
            Common.chainPathAfter = function(base, path, func) {
              return Common.set(base, path, Common.chain(
                Common.get(base, path),
                func
              ));
            };
            Common._requireGlobal = function(globalName, moduleName) {
              var obj = typeof window !== "undefined" ? window[globalName] : typeof global2 !== "undefined" ? global2[globalName] : null;
              return obj || _dereq_(moduleName);
            };
          })();
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 15: [function(_dereq_, module3, exports3) {
        var Engine2 = {};
        module3.exports = Engine2;
        var World2 = _dereq_("../body/World");
        var Sleeping = _dereq_("./Sleeping");
        var Resolver = _dereq_("../collision/Resolver");
        var Render2 = _dereq_("../render/Render");
        var Pairs = _dereq_("../collision/Pairs");
        var Metrics = _dereq_("./Metrics");
        var Grid = _dereq_("../collision/Grid");
        var Events2 = _dereq_("./Events");
        var Composite = _dereq_("../body/Composite");
        var Constraint = _dereq_("../constraint/Constraint");
        var Common = _dereq_("./Common");
        var Body2 = _dereq_("../body/Body");
        (function() {
          Engine2.create = function(element, options) {
            options = Common.isElement(element) ? options : element;
            element = Common.isElement(element) ? element : null;
            options = options || {};
            if (element || options.render) {
              Common.warn("Engine.create: engine.render is deprecated (see docs)");
            }
            var defaults = {
              positionIterations: 6,
              velocityIterations: 4,
              constraintIterations: 2,
              enableSleeping: false,
              events: [],
              plugin: {},
              timing: {
                timestamp: 0,
                timeScale: 1
              },
              broadphase: {
                controller: Grid
              }
            };
            var engine = Common.extend(defaults, options);
            if (element || engine.render) {
              var renderDefaults = {
                element,
                controller: Render2
              };
              engine.render = Common.extend(renderDefaults, engine.render);
            }
            if (engine.render && engine.render.controller) {
              engine.render = engine.render.controller.create(engine.render);
            }
            if (engine.render) {
              engine.render.engine = engine;
            }
            engine.world = options.world || World2.create(engine.world);
            engine.pairs = Pairs.create();
            engine.broadphase = engine.broadphase.controller.create(engine.broadphase);
            engine.metrics = engine.metrics || { extended: false };
            return engine;
          };
          Engine2.update = function(engine, delta, correction) {
            delta = delta || 1e3 / 60;
            correction = correction || 1;
            var world = engine.world, timing = engine.timing, broadphase = engine.broadphase, broadphasePairs = [], i;
            timing.timestamp += delta * timing.timeScale;
            var event = {
              timestamp: timing.timestamp
            };
            Events2.trigger(engine, "beforeUpdate", event);
            var allBodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world);
            if (engine.enableSleeping)
              Sleeping.update(allBodies, timing.timeScale);
            Engine2._bodiesApplyGravity(allBodies, world.gravity);
            Engine2._bodiesUpdate(allBodies, delta, timing.timeScale, correction, world.bounds);
            Constraint.preSolveAll(allBodies);
            for (i = 0; i < engine.constraintIterations; i++) {
              Constraint.solveAll(allConstraints, timing.timeScale);
            }
            Constraint.postSolveAll(allBodies);
            if (broadphase.controller) {
              if (world.isModified)
                broadphase.controller.clear(broadphase);
              broadphase.controller.update(broadphase, allBodies, engine, world.isModified);
              broadphasePairs = broadphase.pairsList;
            } else {
              broadphasePairs = allBodies;
            }
            if (world.isModified) {
              Composite.setModified(world, false, false, true);
            }
            var collisions = broadphase.detector(broadphasePairs, engine);
            var pairs = engine.pairs, timestamp = timing.timestamp;
            Pairs.update(pairs, collisions, timestamp);
            Pairs.removeOld(pairs, timestamp);
            if (engine.enableSleeping)
              Sleeping.afterCollisions(pairs.list, timing.timeScale);
            if (pairs.collisionStart.length > 0)
              Events2.trigger(engine, "collisionStart", { pairs: pairs.collisionStart });
            Resolver.preSolvePosition(pairs.list);
            for (i = 0; i < engine.positionIterations; i++) {
              Resolver.solvePosition(pairs.list, timing.timeScale);
            }
            Resolver.postSolvePosition(allBodies);
            Constraint.preSolveAll(allBodies);
            for (i = 0; i < engine.constraintIterations; i++) {
              Constraint.solveAll(allConstraints, timing.timeScale);
            }
            Constraint.postSolveAll(allBodies);
            Resolver.preSolveVelocity(pairs.list);
            for (i = 0; i < engine.velocityIterations; i++) {
              Resolver.solveVelocity(pairs.list, timing.timeScale);
            }
            if (pairs.collisionActive.length > 0)
              Events2.trigger(engine, "collisionActive", { pairs: pairs.collisionActive });
            if (pairs.collisionEnd.length > 0)
              Events2.trigger(engine, "collisionEnd", { pairs: pairs.collisionEnd });
            Engine2._bodiesClearForces(allBodies);
            Events2.trigger(engine, "afterUpdate", event);
            return engine;
          };
          Engine2.merge = function(engineA, engineB) {
            Common.extend(engineA, engineB);
            if (engineB.world) {
              engineA.world = engineB.world;
              Engine2.clear(engineA);
              var bodies = Composite.allBodies(engineA.world);
              for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                Sleeping.set(body, false);
                body.id = Common.nextId();
              }
            }
          };
          Engine2.clear = function(engine) {
            var world = engine.world;
            Pairs.clear(engine.pairs);
            var broadphase = engine.broadphase;
            if (broadphase.controller) {
              var bodies = Composite.allBodies(world);
              broadphase.controller.clear(broadphase);
              broadphase.controller.update(broadphase, bodies, engine, true);
            }
          };
          Engine2._bodiesClearForces = function(bodies) {
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              body.force.x = 0;
              body.force.y = 0;
              body.torque = 0;
            }
          };
          Engine2._bodiesApplyGravity = function(bodies, gravity) {
            var gravityScale = typeof gravity.scale !== "undefined" ? gravity.scale : 1e-3;
            if (gravity.x === 0 && gravity.y === 0 || gravityScale === 0) {
              return;
            }
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (body.isStatic || body.isSleeping)
                continue;
              body.force.y += body.mass * gravity.y * gravityScale;
              body.force.x += body.mass * gravity.x * gravityScale;
            }
          };
          Engine2._bodiesUpdate = function(bodies, deltaTime, timeScale, correction, worldBounds) {
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (body.isStatic || body.isSleeping)
                continue;
              Body2.update(body, deltaTime, timeScale, correction);
            }
          };
        })();
      }, { "../body/Body": 1, "../body/Composite": 2, "../body/World": 3, "../collision/Grid": 6, "../collision/Pairs": 8, "../collision/Resolver": 10, "../constraint/Constraint": 12, "../render/Render": 31, "./Common": 14, "./Events": 16, "./Metrics": 18, "./Sleeping": 22 }], 16: [function(_dereq_, module3, exports3) {
        var Events2 = {};
        module3.exports = Events2;
        var Common = _dereq_("./Common");
        (function() {
          Events2.on = function(object, eventNames, callback) {
            var names = eventNames.split(" "), name;
            for (var i = 0; i < names.length; i++) {
              name = names[i];
              object.events = object.events || {};
              object.events[name] = object.events[name] || [];
              object.events[name].push(callback);
            }
            return callback;
          };
          Events2.off = function(object, eventNames, callback) {
            if (!eventNames) {
              object.events = {};
              return;
            }
            if (typeof eventNames === "function") {
              callback = eventNames;
              eventNames = Common.keys(object.events).join(" ");
            }
            var names = eventNames.split(" ");
            for (var i = 0; i < names.length; i++) {
              var callbacks = object.events[names[i]], newCallbacks = [];
              if (callback && callbacks) {
                for (var j = 0; j < callbacks.length; j++) {
                  if (callbacks[j] !== callback)
                    newCallbacks.push(callbacks[j]);
                }
              }
              object.events[names[i]] = newCallbacks;
            }
          };
          Events2.trigger = function(object, eventNames, event) {
            var names, name, callbacks, eventClone;
            if (object.events) {
              if (!event)
                event = {};
              names = eventNames.split(" ");
              for (var i = 0; i < names.length; i++) {
                name = names[i];
                callbacks = object.events[name];
                if (callbacks) {
                  eventClone = Common.clone(event, false);
                  eventClone.name = name;
                  eventClone.source = object;
                  for (var j = 0; j < callbacks.length; j++) {
                    callbacks[j].apply(object, [eventClone]);
                  }
                }
              }
            }
          };
        })();
      }, { "./Common": 14 }], 17: [function(_dereq_, module3, exports3) {
        var Matter = {};
        module3.exports = Matter;
        var Plugin = _dereq_("./Plugin");
        var Common = _dereq_("./Common");
        (function() {
          Matter.name = "matter-js";
          Matter.version = "0.14.2";
          Matter.uses = [];
          Matter.used = [];
          Matter.use = function() {
            Plugin.use(Matter, Array.prototype.slice.call(arguments));
          };
          Matter.before = function(path, func) {
            path = path.replace(/^Matter./, "");
            return Common.chainPathBefore(Matter, path, func);
          };
          Matter.after = function(path, func) {
            path = path.replace(/^Matter./, "");
            return Common.chainPathAfter(Matter, path, func);
          };
        })();
      }, { "./Common": 14, "./Plugin": 20 }], 18: [function(_dereq_, module3, exports3) {
      }, { "../body/Composite": 2, "./Common": 14 }], 19: [function(_dereq_, module3, exports3) {
        var Mouse2 = {};
        module3.exports = Mouse2;
        var Common = _dereq_("../core/Common");
        (function() {
          Mouse2.create = function(element) {
            var mouse = {};
            if (!element) {
              Common.log("Mouse.create: element was undefined, defaulting to document.body", "warn");
            }
            mouse.element = element || document.body;
            mouse.absolute = { x: 0, y: 0 };
            mouse.position = { x: 0, y: 0 };
            mouse.mousedownPosition = { x: 0, y: 0 };
            mouse.mouseupPosition = { x: 0, y: 0 };
            mouse.offset = { x: 0, y: 0 };
            mouse.scale = { x: 1, y: 1 };
            mouse.wheelDelta = 0;
            mouse.button = -1;
            mouse.pixelRatio = mouse.element.getAttribute("data-pixel-ratio") || 1;
            mouse.sourceEvents = {
              mousemove: null,
              mousedown: null,
              mouseup: null,
              mousewheel: null
            };
            mouse.mousemove = function(event) {
              var position = Mouse2._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                mouse.button = 0;
                event.preventDefault();
              }
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.sourceEvents.mousemove = event;
            };
            mouse.mousedown = function(event) {
              var position = Mouse2._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                mouse.button = 0;
                event.preventDefault();
              } else {
                mouse.button = event.button;
              }
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.mousedownPosition.x = mouse.position.x;
              mouse.mousedownPosition.y = mouse.position.y;
              mouse.sourceEvents.mousedown = event;
            };
            mouse.mouseup = function(event) {
              var position = Mouse2._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
              if (touches) {
                event.preventDefault();
              }
              mouse.button = -1;
              mouse.absolute.x = position.x;
              mouse.absolute.y = position.y;
              mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
              mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              mouse.mouseupPosition.x = mouse.position.x;
              mouse.mouseupPosition.y = mouse.position.y;
              mouse.sourceEvents.mouseup = event;
            };
            mouse.mousewheel = function(event) {
              mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
              event.preventDefault();
            };
            Mouse2.setElement(mouse, mouse.element);
            return mouse;
          };
          Mouse2.setElement = function(mouse, element) {
            mouse.element = element;
            element.addEventListener("mousemove", mouse.mousemove);
            element.addEventListener("mousedown", mouse.mousedown);
            element.addEventListener("mouseup", mouse.mouseup);
            element.addEventListener("mousewheel", mouse.mousewheel);
            element.addEventListener("DOMMouseScroll", mouse.mousewheel);
            element.addEventListener("touchmove", mouse.mousemove);
            element.addEventListener("touchstart", mouse.mousedown);
            element.addEventListener("touchend", mouse.mouseup);
          };
          Mouse2.clearSourceEvents = function(mouse) {
            mouse.sourceEvents.mousemove = null;
            mouse.sourceEvents.mousedown = null;
            mouse.sourceEvents.mouseup = null;
            mouse.sourceEvents.mousewheel = null;
            mouse.wheelDelta = 0;
          };
          Mouse2.setOffset = function(mouse, offset) {
            mouse.offset.x = offset.x;
            mouse.offset.y = offset.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
          };
          Mouse2.setScale = function(mouse, scale) {
            mouse.scale.x = scale.x;
            mouse.scale.y = scale.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
          };
          Mouse2._getRelativeMousePosition = function(event, element, pixelRatio) {
            var elementBounds = element.getBoundingClientRect(), rootNode = document.documentElement || document.body.parentNode || document.body, scrollX = window.pageXOffset !== void 0 ? window.pageXOffset : rootNode.scrollLeft, scrollY = window.pageYOffset !== void 0 ? window.pageYOffset : rootNode.scrollTop, touches = event.changedTouches, x, y;
            if (touches) {
              x = touches[0].pageX - elementBounds.left - scrollX;
              y = touches[0].pageY - elementBounds.top - scrollY;
            } else {
              x = event.pageX - elementBounds.left - scrollX;
              y = event.pageY - elementBounds.top - scrollY;
            }
            return {
              x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
              y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
            };
          };
        })();
      }, { "../core/Common": 14 }], 20: [function(_dereq_, module3, exports3) {
        var Plugin = {};
        module3.exports = Plugin;
        var Common = _dereq_("./Common");
        (function() {
          Plugin._registry = {};
          Plugin.register = function(plugin) {
            if (!Plugin.isPlugin(plugin)) {
              Common.warn("Plugin.register:", Plugin.toString(plugin), "does not implement all required fields.");
            }
            if (plugin.name in Plugin._registry) {
              var registered = Plugin._registry[plugin.name], pluginVersion = Plugin.versionParse(plugin.version).number, registeredVersion = Plugin.versionParse(registered.version).number;
              if (pluginVersion > registeredVersion) {
                Common.warn("Plugin.register:", Plugin.toString(registered), "was upgraded to", Plugin.toString(plugin));
                Plugin._registry[plugin.name] = plugin;
              } else if (pluginVersion < registeredVersion) {
                Common.warn("Plugin.register:", Plugin.toString(registered), "can not be downgraded to", Plugin.toString(plugin));
              } else if (plugin !== registered) {
                Common.warn("Plugin.register:", Plugin.toString(plugin), "is already registered to different plugin object");
              }
            } else {
              Plugin._registry[plugin.name] = plugin;
            }
            return plugin;
          };
          Plugin.resolve = function(dependency) {
            return Plugin._registry[Plugin.dependencyParse(dependency).name];
          };
          Plugin.toString = function(plugin) {
            return typeof plugin === "string" ? plugin : (plugin.name || "anonymous") + "@" + (plugin.version || plugin.range || "0.0.0");
          };
          Plugin.isPlugin = function(obj) {
            return obj && obj.name && obj.version && obj.install;
          };
          Plugin.isUsed = function(module4, name) {
            return module4.used.indexOf(name) > -1;
          };
          Plugin.isFor = function(plugin, module4) {
            var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
            return !plugin.for || module4.name === parsed.name && Plugin.versionSatisfies(module4.version, parsed.range);
          };
          Plugin.use = function(module4, plugins) {
            module4.uses = (module4.uses || []).concat(plugins || []);
            if (module4.uses.length === 0) {
              Common.warn("Plugin.use:", Plugin.toString(module4), "does not specify any dependencies to install.");
              return;
            }
            var dependencies = Plugin.dependencies(module4), sortedDependencies = Common.topologicalSort(dependencies), status = [];
            for (var i = 0; i < sortedDependencies.length; i += 1) {
              if (sortedDependencies[i] === module4.name) {
                continue;
              }
              var plugin = Plugin.resolve(sortedDependencies[i]);
              if (!plugin) {
                status.push("\u274C " + sortedDependencies[i]);
                continue;
              }
              if (Plugin.isUsed(module4, plugin.name)) {
                continue;
              }
              if (!Plugin.isFor(plugin, module4)) {
                Common.warn("Plugin.use:", Plugin.toString(plugin), "is for", plugin.for, "but installed on", Plugin.toString(module4) + ".");
                plugin._warned = true;
              }
              if (plugin.install) {
                plugin.install(module4);
              } else {
                Common.warn("Plugin.use:", Plugin.toString(plugin), "does not specify an install function.");
                plugin._warned = true;
              }
              if (plugin._warned) {
                status.push("\u{1F536} " + Plugin.toString(plugin));
                delete plugin._warned;
              } else {
                status.push("\u2705 " + Plugin.toString(plugin));
              }
              module4.used.push(plugin.name);
            }
            if (status.length > 0) {
              Common.info(status.join("  "));
            }
          };
          Plugin.dependencies = function(module4, tracked) {
            var parsedBase = Plugin.dependencyParse(module4), name = parsedBase.name;
            tracked = tracked || {};
            if (name in tracked) {
              return;
            }
            module4 = Plugin.resolve(module4) || module4;
            tracked[name] = Common.map(module4.uses || [], function(dependency) {
              if (Plugin.isPlugin(dependency)) {
                Plugin.register(dependency);
              }
              var parsed = Plugin.dependencyParse(dependency), resolved = Plugin.resolve(dependency);
              if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
                Common.warn(
                  "Plugin.dependencies:",
                  Plugin.toString(resolved),
                  "does not satisfy",
                  Plugin.toString(parsed),
                  "used by",
                  Plugin.toString(parsedBase) + "."
                );
                resolved._warned = true;
                module4._warned = true;
              } else if (!resolved) {
                Common.warn(
                  "Plugin.dependencies:",
                  Plugin.toString(dependency),
                  "used by",
                  Plugin.toString(parsedBase),
                  "could not be resolved."
                );
                module4._warned = true;
              }
              return parsed.name;
            });
            for (var i = 0; i < tracked[name].length; i += 1) {
              Plugin.dependencies(tracked[name][i], tracked);
            }
            return tracked;
          };
          Plugin.dependencyParse = function(dependency) {
            if (Common.isString(dependency)) {
              var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;
              if (!pattern.test(dependency)) {
                Common.warn("Plugin.dependencyParse:", dependency, "is not a valid dependency string.");
              }
              return {
                name: dependency.split("@")[0],
                range: dependency.split("@")[1] || "*"
              };
            }
            return {
              name: dependency.name,
              range: dependency.range || dependency.version
            };
          };
          Plugin.versionParse = function(range) {
            var pattern = /^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/;
            if (!pattern.test(range)) {
              Common.warn("Plugin.versionParse:", range, "is not a valid version or range.");
            }
            var identifiers = range.split("-");
            range = identifiers[0];
            var isRange = isNaN(Number(range[0])), version = isRange ? range.substr(1) : range, parts = Common.map(version.split("."), function(part) {
              return Number(part);
            });
            return {
              isRange,
              version,
              range,
              operator: isRange ? range[0] : "",
              parts,
              prerelease: identifiers[1],
              number: parts[0] * 1e8 + parts[1] * 1e4 + parts[2]
            };
          };
          Plugin.versionSatisfies = function(version, range) {
            range = range || "*";
            var rangeParsed = Plugin.versionParse(range), rangeParts = rangeParsed.parts, versionParsed = Plugin.versionParse(version), versionParts = versionParsed.parts;
            if (rangeParsed.isRange) {
              if (rangeParsed.operator === "*" || version === "*") {
                return true;
              }
              if (rangeParsed.operator === "~") {
                return versionParts[0] === rangeParts[0] && versionParts[1] === rangeParts[1] && versionParts[2] >= rangeParts[2];
              }
              if (rangeParsed.operator === "^") {
                if (rangeParts[0] > 0) {
                  return versionParts[0] === rangeParts[0] && versionParsed.number >= rangeParsed.number;
                }
                if (rangeParts[1] > 0) {
                  return versionParts[1] === rangeParts[1] && versionParts[2] >= rangeParts[2];
                }
                return versionParts[2] === rangeParts[2];
              }
            }
            return version === range || version === "*";
          };
        })();
      }, { "./Common": 14 }], 21: [function(_dereq_, module3, exports3) {
        var Runner = {};
        module3.exports = Runner;
        var Events2 = _dereq_("./Events");
        var Engine2 = _dereq_("./Engine");
        var Common = _dereq_("./Common");
        (function() {
          var _requestAnimationFrame, _cancelAnimationFrame;
          if (typeof window !== "undefined") {
            _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
            _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
          }
          if (!_requestAnimationFrame) {
            var _frameTimeout;
            _requestAnimationFrame = function(callback) {
              _frameTimeout = setTimeout(function() {
                callback(Common.now());
              }, 1e3 / 60);
            };
            _cancelAnimationFrame = function() {
              clearTimeout(_frameTimeout);
            };
          }
          Runner.create = function(options) {
            var defaults = {
              fps: 60,
              correction: 1,
              deltaSampleSize: 60,
              counterTimestamp: 0,
              frameCounter: 0,
              deltaHistory: [],
              timePrev: null,
              timeScalePrev: 1,
              frameRequestId: null,
              isFixed: false,
              enabled: true
            };
            var runner = Common.extend(defaults, options);
            runner.delta = runner.delta || 1e3 / runner.fps;
            runner.deltaMin = runner.deltaMin || 1e3 / runner.fps;
            runner.deltaMax = runner.deltaMax || 1e3 / (runner.fps * 0.5);
            runner.fps = 1e3 / runner.delta;
            return runner;
          };
          Runner.run = function(runner, engine) {
            if (typeof runner.positionIterations !== "undefined") {
              engine = runner;
              runner = Runner.create();
            }
            (function render(time) {
              runner.frameRequestId = _requestAnimationFrame(render);
              if (time && runner.enabled) {
                Runner.tick(runner, engine, time);
              }
            })();
            return runner;
          };
          Runner.tick = function(runner, engine, time) {
            var timing = engine.timing, correction = 1, delta;
            var event = {
              timestamp: timing.timestamp
            };
            Events2.trigger(runner, "beforeTick", event);
            Events2.trigger(engine, "beforeTick", event);
            if (runner.isFixed) {
              delta = runner.delta;
            } else {
              delta = time - runner.timePrev || runner.delta;
              runner.timePrev = time;
              runner.deltaHistory.push(delta);
              runner.deltaHistory = runner.deltaHistory.slice(-runner.deltaSampleSize);
              delta = Math.min.apply(null, runner.deltaHistory);
              delta = delta < runner.deltaMin ? runner.deltaMin : delta;
              delta = delta > runner.deltaMax ? runner.deltaMax : delta;
              correction = delta / runner.delta;
              runner.delta = delta;
            }
            if (runner.timeScalePrev !== 0)
              correction *= timing.timeScale / runner.timeScalePrev;
            if (timing.timeScale === 0)
              correction = 0;
            runner.timeScalePrev = timing.timeScale;
            runner.correction = correction;
            runner.frameCounter += 1;
            if (time - runner.counterTimestamp >= 1e3) {
              runner.fps = runner.frameCounter * ((time - runner.counterTimestamp) / 1e3);
              runner.counterTimestamp = time;
              runner.frameCounter = 0;
            }
            Events2.trigger(runner, "tick", event);
            Events2.trigger(engine, "tick", event);
            if (engine.world.isModified && engine.render && engine.render.controller && engine.render.controller.clear) {
              engine.render.controller.clear(engine.render);
            }
            Events2.trigger(runner, "beforeUpdate", event);
            Engine2.update(engine, delta, correction);
            Events2.trigger(runner, "afterUpdate", event);
            if (engine.render && engine.render.controller) {
              Events2.trigger(runner, "beforeRender", event);
              Events2.trigger(engine, "beforeRender", event);
              engine.render.controller.world(engine.render);
              Events2.trigger(runner, "afterRender", event);
              Events2.trigger(engine, "afterRender", event);
            }
            Events2.trigger(runner, "afterTick", event);
            Events2.trigger(engine, "afterTick", event);
          };
          Runner.stop = function(runner) {
            _cancelAnimationFrame(runner.frameRequestId);
          };
          Runner.start = function(runner, engine) {
            Runner.run(runner, engine);
          };
        })();
      }, { "./Common": 14, "./Engine": 15, "./Events": 16 }], 22: [function(_dereq_, module3, exports3) {
        var Sleeping = {};
        module3.exports = Sleeping;
        var Events2 = _dereq_("./Events");
        (function() {
          Sleeping._motionWakeThreshold = 0.18;
          Sleeping._motionSleepThreshold = 0.08;
          Sleeping._minBias = 0.9;
          Sleeping.update = function(bodies, timeScale) {
            var timeFactor = timeScale * timeScale * timeScale;
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i], motion = body.speed * body.speed + body.angularSpeed * body.angularSpeed;
              if (body.force.x !== 0 || body.force.y !== 0) {
                Sleeping.set(body, false);
                continue;
              }
              var minMotion = Math.min(body.motion, motion), maxMotion = Math.max(body.motion, motion);
              body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
              if (body.sleepThreshold > 0 && body.motion < Sleeping._motionSleepThreshold * timeFactor) {
                body.sleepCounter += 1;
                if (body.sleepCounter >= body.sleepThreshold)
                  Sleeping.set(body, true);
              } else if (body.sleepCounter > 0) {
                body.sleepCounter -= 1;
              }
            }
          };
          Sleeping.afterCollisions = function(pairs, timeScale) {
            var timeFactor = timeScale * timeScale * timeScale;
            for (var i = 0; i < pairs.length; i++) {
              var pair = pairs[i];
              if (!pair.isActive)
                continue;
              var collision = pair.collision, bodyA = collision.bodyA.parent, bodyB = collision.bodyB.parent;
              if (bodyA.isSleeping && bodyB.isSleeping || bodyA.isStatic || bodyB.isStatic)
                continue;
              if (bodyA.isSleeping || bodyB.isSleeping) {
                var sleepingBody = bodyA.isSleeping && !bodyA.isStatic ? bodyA : bodyB, movingBody = sleepingBody === bodyA ? bodyB : bodyA;
                if (!sleepingBody.isStatic && movingBody.motion > Sleeping._motionWakeThreshold * timeFactor) {
                  Sleeping.set(sleepingBody, false);
                }
              }
            }
          };
          Sleeping.set = function(body, isSleeping) {
            var wasSleeping = body.isSleeping;
            if (isSleeping) {
              body.isSleeping = true;
              body.sleepCounter = body.sleepThreshold;
              body.positionImpulse.x = 0;
              body.positionImpulse.y = 0;
              body.positionPrev.x = body.position.x;
              body.positionPrev.y = body.position.y;
              body.anglePrev = body.angle;
              body.speed = 0;
              body.angularSpeed = 0;
              body.motion = 0;
              if (!wasSleeping) {
                Events2.trigger(body, "sleepStart");
              }
            } else {
              body.isSleeping = false;
              body.sleepCounter = 0;
              if (wasSleeping) {
                Events2.trigger(body, "sleepEnd");
              }
            }
          };
        })();
      }, { "./Events": 16 }], 23: [function(_dereq_, module3, exports3) {
        var Bodies2 = {};
        module3.exports = Bodies2;
        var Vertices = _dereq_("../geometry/Vertices");
        var Common = _dereq_("../core/Common");
        var Body2 = _dereq_("../body/Body");
        var Bounds = _dereq_("../geometry/Bounds");
        var Vector = _dereq_("../geometry/Vector");
        var decomp;
        (function() {
          Bodies2.rectangle = function(x, y, width, height, options) {
            options = options || {};
            var rectangle = {
              label: "Rectangle Body",
              position: { x, y },
              vertices: Vertices.fromPath("L 0 0 L " + width + " 0 L " + width + " " + height + " L 0 " + height)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              rectangle.vertices = Vertices.chamfer(
                rectangle.vertices,
                chamfer.radius,
                chamfer.quality,
                chamfer.qualityMin,
                chamfer.qualityMax
              );
              delete options.chamfer;
            }
            return Body2.create(Common.extend({}, rectangle, options));
          };
          Bodies2.trapezoid = function(x, y, width, height, slope, options) {
            options = options || {};
            slope *= 0.5;
            var roof = (1 - slope * 2) * width;
            var x1 = width * slope, x2 = x1 + roof, x3 = x2 + x1, verticesPath;
            if (slope < 0.5) {
              verticesPath = "L 0 0 L " + x1 + " " + -height + " L " + x2 + " " + -height + " L " + x3 + " 0";
            } else {
              verticesPath = "L 0 0 L " + x2 + " " + -height + " L " + x3 + " 0";
            }
            var trapezoid = {
              label: "Trapezoid Body",
              position: { x, y },
              vertices: Vertices.fromPath(verticesPath)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              trapezoid.vertices = Vertices.chamfer(
                trapezoid.vertices,
                chamfer.radius,
                chamfer.quality,
                chamfer.qualityMin,
                chamfer.qualityMax
              );
              delete options.chamfer;
            }
            return Body2.create(Common.extend({}, trapezoid, options));
          };
          Bodies2.circle = function(x, y, radius, options, maxSides) {
            options = options || {};
            var circle = {
              label: "Circle Body",
              circleRadius: radius
            };
            maxSides = maxSides || 25;
            var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));
            if (sides % 2 === 1)
              sides += 1;
            return Bodies2.polygon(x, y, sides, radius, Common.extend({}, circle, options));
          };
          Bodies2.polygon = function(x, y, sides, radius, options) {
            options = options || {};
            if (sides < 3)
              return Bodies2.circle(x, y, radius, options);
            var theta = 2 * Math.PI / sides, path = "", offset = theta * 0.5;
            for (var i = 0; i < sides; i += 1) {
              var angle = offset + i * theta, xx = Math.cos(angle) * radius, yy = Math.sin(angle) * radius;
              path += "L " + xx.toFixed(3) + " " + yy.toFixed(3) + " ";
            }
            var polygon = {
              label: "Polygon Body",
              position: { x, y },
              vertices: Vertices.fromPath(path)
            };
            if (options.chamfer) {
              var chamfer = options.chamfer;
              polygon.vertices = Vertices.chamfer(
                polygon.vertices,
                chamfer.radius,
                chamfer.quality,
                chamfer.qualityMin,
                chamfer.qualityMax
              );
              delete options.chamfer;
            }
            return Body2.create(Common.extend({}, polygon, options));
          };
          Bodies2.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea) {
            if (!decomp) {
              decomp = Common._requireGlobal("decomp", "poly-decomp");
            }
            var body, parts, isConvex, vertices, i, j, k, v, z;
            options = options || {};
            parts = [];
            flagInternal = typeof flagInternal !== "undefined" ? flagInternal : false;
            removeCollinear = typeof removeCollinear !== "undefined" ? removeCollinear : 0.01;
            minimumArea = typeof minimumArea !== "undefined" ? minimumArea : 10;
            if (!decomp) {
              Common.warn("Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.");
            }
            if (!Common.isArray(vertexSets[0])) {
              vertexSets = [vertexSets];
            }
            for (v = 0; v < vertexSets.length; v += 1) {
              vertices = vertexSets[v];
              isConvex = Vertices.isConvex(vertices);
              if (isConvex || !decomp) {
                if (isConvex) {
                  vertices = Vertices.clockwiseSort(vertices);
                } else {
                  vertices = Vertices.hull(vertices);
                }
                parts.push({
                  position: { x, y },
                  vertices
                });
              } else {
                var concave = vertices.map(function(vertex) {
                  return [vertex.x, vertex.y];
                });
                decomp.makeCCW(concave);
                if (removeCollinear !== false)
                  decomp.removeCollinearPoints(concave, removeCollinear);
                var decomposed = decomp.quickDecomp(concave);
                for (i = 0; i < decomposed.length; i++) {
                  var chunk = decomposed[i];
                  var chunkVertices = chunk.map(function(vertices2) {
                    return {
                      x: vertices2[0],
                      y: vertices2[1]
                    };
                  });
                  if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
                    continue;
                  parts.push({
                    position: Vertices.centre(chunkVertices),
                    vertices: chunkVertices
                  });
                }
              }
            }
            for (i = 0; i < parts.length; i++) {
              parts[i] = Body2.create(Common.extend(parts[i], options));
            }
            if (flagInternal) {
              var coincident_max_dist = 5;
              for (i = 0; i < parts.length; i++) {
                var partA = parts[i];
                for (j = i + 1; j < parts.length; j++) {
                  var partB = parts[j];
                  if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                    var pav = partA.vertices, pbv = partB.vertices;
                    for (k = 0; k < partA.vertices.length; k++) {
                      for (z = 0; z < partB.vertices.length; z++) {
                        var da = Vector.magnitudeSquared(Vector.sub(pav[(k + 1) % pav.length], pbv[z])), db = Vector.magnitudeSquared(Vector.sub(pav[k], pbv[(z + 1) % pbv.length]));
                        if (da < coincident_max_dist && db < coincident_max_dist) {
                          pav[k].isInternal = true;
                          pbv[z].isInternal = true;
                        }
                      }
                    }
                  }
                }
              }
            }
            if (parts.length > 1) {
              body = Body2.create(Common.extend({ parts: parts.slice(0) }, options));
              Body2.setPosition(body, { x, y });
              return body;
            } else {
              return parts[0];
            }
          };
        })();
      }, { "../body/Body": 1, "../core/Common": 14, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 24: [function(_dereq_, module3, exports3) {
        var Composites = {};
        module3.exports = Composites;
        var Composite = _dereq_("../body/Composite");
        var Constraint = _dereq_("../constraint/Constraint");
        var Common = _dereq_("../core/Common");
        var Body2 = _dereq_("../body/Body");
        var Bodies2 = _dereq_("./Bodies");
        (function() {
          Composites.stack = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
            var stack = Composite.create({ label: "Stack" }), x = xx, y = yy, lastBody, i = 0;
            for (var row = 0; row < rows; row++) {
              var maxHeight = 0;
              for (var column = 0; column < columns; column++) {
                var body = callback(x, y, column, row, lastBody, i);
                if (body) {
                  var bodyHeight = body.bounds.max.y - body.bounds.min.y, bodyWidth = body.bounds.max.x - body.bounds.min.x;
                  if (bodyHeight > maxHeight)
                    maxHeight = bodyHeight;
                  Body2.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });
                  x = body.bounds.max.x + columnGap;
                  Composite.addBody(stack, body);
                  lastBody = body;
                  i += 1;
                } else {
                  x += columnGap;
                }
              }
              y += maxHeight + rowGap;
              x = xx;
            }
            return stack;
          };
          Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
            var bodies = composite.bodies;
            for (var i = 1; i < bodies.length; i++) {
              var bodyA = bodies[i - 1], bodyB = bodies[i], bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y, bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y, bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
              var defaults = {
                bodyA,
                pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                bodyB,
                pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
              };
              var constraint = Common.extend(defaults, options);
              Composite.addConstraint(composite, Constraint.create(constraint));
            }
            composite.label += " Chain";
            return composite;
          };
          Composites.mesh = function(composite, columns, rows, crossBrace, options) {
            var bodies = composite.bodies, row, col, bodyA, bodyB, bodyC;
            for (row = 0; row < rows; row++) {
              for (col = 1; col < columns; col++) {
                bodyA = bodies[col - 1 + row * columns];
                bodyB = bodies[col + row * columns];
                Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA, bodyB }, options)));
              }
              if (row > 0) {
                for (col = 0; col < columns; col++) {
                  bodyA = bodies[col + (row - 1) * columns];
                  bodyB = bodies[col + row * columns];
                  Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA, bodyB }, options)));
                  if (crossBrace && col > 0) {
                    bodyC = bodies[col - 1 + (row - 1) * columns];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB }, options)));
                  }
                  if (crossBrace && col < columns - 1) {
                    bodyC = bodies[col + 1 + (row - 1) * columns];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB }, options)));
                  }
                }
              }
            }
            composite.label += " Mesh";
            return composite;
          };
          Composites.pyramid = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
            return Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y, column, row, lastBody, i) {
              var actualRows = Math.min(rows, Math.ceil(columns / 2)), lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;
              if (row > actualRows)
                return;
              row = actualRows - row;
              var start = row, end = columns - 1 - row;
              if (column < start || column > end)
                return;
              if (i === 1) {
                Body2.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
              }
              var xOffset = lastBody ? column * lastBodyWidth : 0;
              return callback(xx + xOffset + column * columnGap, y, column, row, lastBody, i);
            });
          };
          Composites.newtonsCradle = function(xx, yy, number, size, length) {
            var newtonsCradle = Composite.create({ label: "Newtons Cradle" });
            for (var i = 0; i < number; i++) {
              var separation = 1.9, circle = Bodies2.circle(
                xx + i * (size * separation),
                yy + length,
                size,
                { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 1e-4, slop: 1 }
              ), constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });
              Composite.addBody(newtonsCradle, circle);
              Composite.addConstraint(newtonsCradle, constraint);
            }
            return newtonsCradle;
          };
          Composites.car = function(xx, yy, width, height, wheelSize) {
            var group = Body2.nextGroup(true), wheelBase = 20, wheelAOffset = -width * 0.5 + wheelBase, wheelBOffset = width * 0.5 - wheelBase, wheelYOffset = 0;
            var car = Composite.create({ label: "Car" }), body = Bodies2.rectangle(xx, yy, width, height, {
              collisionFilter: {
                group
              },
              chamfer: {
                radius: height * 0.5
              },
              density: 2e-4
            });
            var wheelA = Bodies2.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
              collisionFilter: {
                group
              },
              friction: 0.8
            });
            var wheelB = Bodies2.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
              collisionFilter: {
                group
              },
              friction: 0.8
            });
            var axelA = Constraint.create({
              bodyB: body,
              pointB: { x: wheelAOffset, y: wheelYOffset },
              bodyA: wheelA,
              stiffness: 1,
              length: 0
            });
            var axelB = Constraint.create({
              bodyB: body,
              pointB: { x: wheelBOffset, y: wheelYOffset },
              bodyA: wheelB,
              stiffness: 1,
              length: 0
            });
            Composite.addBody(car, body);
            Composite.addBody(car, wheelA);
            Composite.addBody(car, wheelB);
            Composite.addConstraint(car, axelA);
            Composite.addConstraint(car, axelB);
            return car;
          };
          Composites.softBody = function(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
            particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
            constraintOptions = Common.extend({ stiffness: 0.2, render: { type: "line", anchors: false } }, constraintOptions);
            var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
              return Bodies2.circle(x, y, particleRadius, particleOptions);
            });
            Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
            softBody.label = "Soft Body";
            return softBody;
          };
        })();
      }, { "../body/Body": 1, "../body/Composite": 2, "../constraint/Constraint": 12, "../core/Common": 14, "./Bodies": 23 }], 25: [function(_dereq_, module3, exports3) {
        var Axes = {};
        module3.exports = Axes;
        var Vector = _dereq_("../geometry/Vector");
        var Common = _dereq_("../core/Common");
        (function() {
          Axes.fromVertices = function(vertices) {
            var axes = {};
            for (var i = 0; i < vertices.length; i++) {
              var j = (i + 1) % vertices.length, normal = Vector.normalise({
                x: vertices[j].y - vertices[i].y,
                y: vertices[i].x - vertices[j].x
              }), gradient = normal.y === 0 ? Infinity : normal.x / normal.y;
              gradient = gradient.toFixed(3).toString();
              axes[gradient] = normal;
            }
            return Common.values(axes);
          };
          Axes.rotate = function(axes, angle) {
            if (angle === 0)
              return;
            var cos = Math.cos(angle), sin = Math.sin(angle);
            for (var i = 0; i < axes.length; i++) {
              var axis = axes[i], xx;
              xx = axis.x * cos - axis.y * sin;
              axis.y = axis.x * sin + axis.y * cos;
              axis.x = xx;
            }
          };
        })();
      }, { "../core/Common": 14, "../geometry/Vector": 28 }], 26: [function(_dereq_, module3, exports3) {
        var Bounds = {};
        module3.exports = Bounds;
        (function() {
          Bounds.create = function(vertices) {
            var bounds = {
              min: { x: 0, y: 0 },
              max: { x: 0, y: 0 }
            };
            if (vertices)
              Bounds.update(bounds, vertices);
            return bounds;
          };
          Bounds.update = function(bounds, vertices, velocity) {
            bounds.min.x = Infinity;
            bounds.max.x = -Infinity;
            bounds.min.y = Infinity;
            bounds.max.y = -Infinity;
            for (var i = 0; i < vertices.length; i++) {
              var vertex = vertices[i];
              if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
              if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
              if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
              if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
            }
            if (velocity) {
              if (velocity.x > 0) {
                bounds.max.x += velocity.x;
              } else {
                bounds.min.x += velocity.x;
              }
              if (velocity.y > 0) {
                bounds.max.y += velocity.y;
              } else {
                bounds.min.y += velocity.y;
              }
            }
          };
          Bounds.contains = function(bounds, point) {
            return point.x >= bounds.min.x && point.x <= bounds.max.x && point.y >= bounds.min.y && point.y <= bounds.max.y;
          };
          Bounds.overlaps = function(boundsA, boundsB) {
            return boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y;
          };
          Bounds.translate = function(bounds, vector) {
            bounds.min.x += vector.x;
            bounds.max.x += vector.x;
            bounds.min.y += vector.y;
            bounds.max.y += vector.y;
          };
          Bounds.shift = function(bounds, position) {
            var deltaX = bounds.max.x - bounds.min.x, deltaY = bounds.max.y - bounds.min.y;
            bounds.min.x = position.x;
            bounds.max.x = position.x + deltaX;
            bounds.min.y = position.y;
            bounds.max.y = position.y + deltaY;
          };
        })();
      }, {}], 27: [function(_dereq_, module3, exports3) {
        var Svg = {};
        module3.exports = Svg;
        var Bounds = _dereq_("../geometry/Bounds");
        var Common = _dereq_("../core/Common");
        (function() {
          Svg.pathToVertices = function(path, sampleLength) {
            if (typeof window !== "undefined" && !("SVGPathSeg" in window)) {
              Common.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
            }
            var i, il, total, point, segment, segments, segmentsQueue, lastSegment, lastPoint, segmentIndex, points = [], lx, ly, length = 0, x = 0, y = 0;
            sampleLength = sampleLength || 15;
            var addPoint = function(px, py, pathSegType) {
              var isRelative = pathSegType % 2 === 1 && pathSegType > 1;
              if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                if (lastPoint && isRelative) {
                  lx = lastPoint.x;
                  ly = lastPoint.y;
                } else {
                  lx = 0;
                  ly = 0;
                }
                var point2 = {
                  x: lx + px,
                  y: ly + py
                };
                if (isRelative || !lastPoint) {
                  lastPoint = point2;
                }
                points.push(point2);
                x = lx + px;
                y = ly + py;
              }
            };
            var addSegmentPoint = function(segment2) {
              var segType = segment2.pathSegTypeAsLetter.toUpperCase();
              if (segType === "Z")
                return;
              switch (segType) {
                case "M":
                case "L":
                case "T":
                case "C":
                case "S":
                case "Q":
                  x = segment2.x;
                  y = segment2.y;
                  break;
                case "H":
                  x = segment2.x;
                  break;
                case "V":
                  y = segment2.y;
                  break;
              }
              addPoint(x, y, segment2.pathSegType);
            };
            Svg._svgPathToAbsolute(path);
            total = path.getTotalLength();
            segments = [];
            for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
              segments.push(path.pathSegList.getItem(i));
            segmentsQueue = segments.concat();
            while (length < total) {
              segmentIndex = path.getPathSegAtLength(length);
              segment = segments[segmentIndex];
              if (segment != lastSegment) {
                while (segmentsQueue.length && segmentsQueue[0] != segment)
                  addSegmentPoint(segmentsQueue.shift());
                lastSegment = segment;
              }
              switch (segment.pathSegTypeAsLetter.toUpperCase()) {
                case "C":
                case "T":
                case "S":
                case "Q":
                case "A":
                  point = path.getPointAtLength(length);
                  addPoint(point.x, point.y, 0);
                  break;
              }
              length += sampleLength;
            }
            for (i = 0, il = segmentsQueue.length; i < il; ++i)
              addSegmentPoint(segmentsQueue[i]);
            return points;
          };
          Svg._svgPathToAbsolute = function(path) {
            var x0, y0, x1, y1, x2, y2, segs = path.pathSegList, x = 0, y = 0, len = segs.numberOfItems;
            for (var i = 0; i < len; ++i) {
              var seg = segs.getItem(i), segType = seg.pathSegTypeAsLetter;
              if (/[MLHVCSQTA]/.test(segType)) {
                if ("x" in seg) x = seg.x;
                if ("y" in seg) y = seg.y;
              } else {
                if ("x1" in seg) x1 = x + seg.x1;
                if ("x2" in seg) x2 = x + seg.x2;
                if ("y1" in seg) y1 = y + seg.y1;
                if ("y2" in seg) y2 = y + seg.y2;
                if ("x" in seg) x += seg.x;
                if ("y" in seg) y += seg.y;
                switch (segType) {
                  case "m":
                    segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
                    break;
                  case "l":
                    segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
                    break;
                  case "h":
                    segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
                    break;
                  case "v":
                    segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
                    break;
                  case "c":
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
                    break;
                  case "s":
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
                    break;
                  case "q":
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
                    break;
                  case "t":
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
                    break;
                  case "a":
                    segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                    break;
                  case "z":
                  case "Z":
                    x = x0;
                    y = y0;
                    break;
                }
              }
              if (segType == "M" || segType == "m") {
                x0 = x;
                y0 = y;
              }
            }
          };
        })();
      }, { "../core/Common": 14, "../geometry/Bounds": 26 }], 28: [function(_dereq_, module3, exports3) {
        var Vector = {};
        module3.exports = Vector;
        (function() {
          Vector.create = function(x, y) {
            return { x: x || 0, y: y || 0 };
          };
          Vector.clone = function(vector) {
            return { x: vector.x, y: vector.y };
          };
          Vector.magnitude = function(vector) {
            return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
          };
          Vector.magnitudeSquared = function(vector) {
            return vector.x * vector.x + vector.y * vector.y;
          };
          Vector.rotate = function(vector, angle, output) {
            var cos = Math.cos(angle), sin = Math.sin(angle);
            if (!output) output = {};
            var x = vector.x * cos - vector.y * sin;
            output.y = vector.x * sin + vector.y * cos;
            output.x = x;
            return output;
          };
          Vector.rotateAbout = function(vector, angle, point, output) {
            var cos = Math.cos(angle), sin = Math.sin(angle);
            if (!output) output = {};
            var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
            output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
            output.x = x;
            return output;
          };
          Vector.normalise = function(vector) {
            var magnitude = Vector.magnitude(vector);
            if (magnitude === 0)
              return { x: 0, y: 0 };
            return { x: vector.x / magnitude, y: vector.y / magnitude };
          };
          Vector.dot = function(vectorA, vectorB) {
            return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
          };
          Vector.cross = function(vectorA, vectorB) {
            return vectorA.x * vectorB.y - vectorA.y * vectorB.x;
          };
          Vector.cross3 = function(vectorA, vectorB, vectorC) {
            return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
          };
          Vector.add = function(vectorA, vectorB, output) {
            if (!output) output = {};
            output.x = vectorA.x + vectorB.x;
            output.y = vectorA.y + vectorB.y;
            return output;
          };
          Vector.sub = function(vectorA, vectorB, output) {
            if (!output) output = {};
            output.x = vectorA.x - vectorB.x;
            output.y = vectorA.y - vectorB.y;
            return output;
          };
          Vector.mult = function(vector, scalar) {
            return { x: vector.x * scalar, y: vector.y * scalar };
          };
          Vector.div = function(vector, scalar) {
            return { x: vector.x / scalar, y: vector.y / scalar };
          };
          Vector.perp = function(vector, negate) {
            negate = negate === true ? -1 : 1;
            return { x: negate * -vector.y, y: negate * vector.x };
          };
          Vector.neg = function(vector) {
            return { x: -vector.x, y: -vector.y };
          };
          Vector.angle = function(vectorA, vectorB) {
            return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
          };
          Vector._temp = [
            Vector.create(),
            Vector.create(),
            Vector.create(),
            Vector.create(),
            Vector.create(),
            Vector.create()
          ];
        })();
      }, {}], 29: [function(_dereq_, module3, exports3) {
        var Vertices = {};
        module3.exports = Vertices;
        var Vector = _dereq_("../geometry/Vector");
        var Common = _dereq_("../core/Common");
        (function() {
          Vertices.create = function(points, body) {
            var vertices = [];
            for (var i = 0; i < points.length; i++) {
              var point = points[i], vertex = {
                x: point.x,
                y: point.y,
                index: i,
                body,
                isInternal: false
              };
              vertices.push(vertex);
            }
            return vertices;
          };
          Vertices.fromPath = function(path, body) {
            var pathPattern = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/ig, points = [];
            path.replace(pathPattern, function(match, x, y) {
              points.push({ x: parseFloat(x), y: parseFloat(y) });
            });
            return Vertices.create(points, body);
          };
          Vertices.centre = function(vertices) {
            var area = Vertices.area(vertices, true), centre = { x: 0, y: 0 }, cross, temp, j;
            for (var i = 0; i < vertices.length; i++) {
              j = (i + 1) % vertices.length;
              cross = Vector.cross(vertices[i], vertices[j]);
              temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
              centre = Vector.add(centre, temp);
            }
            return Vector.div(centre, 6 * area);
          };
          Vertices.mean = function(vertices) {
            var average = { x: 0, y: 0 };
            for (var i = 0; i < vertices.length; i++) {
              average.x += vertices[i].x;
              average.y += vertices[i].y;
            }
            return Vector.div(average, vertices.length);
          };
          Vertices.area = function(vertices, signed) {
            var area = 0, j = vertices.length - 1;
            for (var i = 0; i < vertices.length; i++) {
              area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
              j = i;
            }
            if (signed)
              return area / 2;
            return Math.abs(area) / 2;
          };
          Vertices.inertia = function(vertices, mass) {
            var numerator = 0, denominator = 0, v = vertices, cross, j;
            for (var n = 0; n < v.length; n++) {
              j = (n + 1) % v.length;
              cross = Math.abs(Vector.cross(v[j], v[n]));
              numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
              denominator += cross;
            }
            return mass / 6 * (numerator / denominator);
          };
          Vertices.translate = function(vertices, vector, scalar) {
            var i;
            if (scalar) {
              for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x * scalar;
                vertices[i].y += vector.y * scalar;
              }
            } else {
              for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x;
                vertices[i].y += vector.y;
              }
            }
            return vertices;
          };
          Vertices.rotate = function(vertices, angle, point) {
            if (angle === 0)
              return;
            var cos = Math.cos(angle), sin = Math.sin(angle);
            for (var i = 0; i < vertices.length; i++) {
              var vertice = vertices[i], dx = vertice.x - point.x, dy = vertice.y - point.y;
              vertice.x = point.x + (dx * cos - dy * sin);
              vertice.y = point.y + (dx * sin + dy * cos);
            }
            return vertices;
          };
          Vertices.contains = function(vertices, point) {
            for (var i = 0; i < vertices.length; i++) {
              var vertice = vertices[i], nextVertice = vertices[(i + 1) % vertices.length];
              if ((point.x - vertice.x) * (nextVertice.y - vertice.y) + (point.y - vertice.y) * (vertice.x - nextVertice.x) > 0) {
                return false;
              }
            }
            return true;
          };
          Vertices.scale = function(vertices, scaleX, scaleY, point) {
            if (scaleX === 1 && scaleY === 1)
              return vertices;
            point = point || Vertices.centre(vertices);
            var vertex, delta;
            for (var i = 0; i < vertices.length; i++) {
              vertex = vertices[i];
              delta = Vector.sub(vertex, point);
              vertices[i].x = point.x + delta.x * scaleX;
              vertices[i].y = point.y + delta.y * scaleY;
            }
            return vertices;
          };
          Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
            if (typeof radius === "number") {
              radius = [radius];
            } else {
              radius = radius || [8];
            }
            quality = typeof quality !== "undefined" ? quality : -1;
            qualityMin = qualityMin || 2;
            qualityMax = qualityMax || 14;
            var newVertices = [];
            for (var i = 0; i < vertices.length; i++) {
              var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1], vertex = vertices[i], nextVertex = vertices[(i + 1) % vertices.length], currentRadius = radius[i < radius.length ? i : radius.length - 1];
              if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
              }
              var prevNormal = Vector.normalise({
                x: vertex.y - prevVertex.y,
                y: prevVertex.x - vertex.x
              });
              var nextNormal = Vector.normalise({
                x: nextVertex.y - vertex.y,
                y: vertex.x - nextVertex.x
              });
              var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)), radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius), midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)), scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));
              var precision = quality;
              if (quality === -1) {
                precision = Math.pow(currentRadius, 0.32) * 1.75;
              }
              precision = Common.clamp(precision, qualityMin, qualityMax);
              if (precision % 2 === 1)
                precision += 1;
              var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)), theta = alpha / precision;
              for (var j = 0; j < precision; j++) {
                newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
              }
            }
            return newVertices;
          };
          Vertices.clockwiseSort = function(vertices) {
            var centre = Vertices.mean(vertices);
            vertices.sort(function(vertexA, vertexB) {
              return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
            });
            return vertices;
          };
          Vertices.isConvex = function(vertices) {
            var flag = 0, n = vertices.length, i, j, k, z;
            if (n < 3)
              return null;
            for (i = 0; i < n; i++) {
              j = (i + 1) % n;
              k = (i + 2) % n;
              z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
              z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
              if (z < 0) {
                flag |= 1;
              } else if (z > 0) {
                flag |= 2;
              }
              if (flag === 3) {
                return false;
              }
            }
            if (flag !== 0) {
              return true;
            } else {
              return null;
            }
          };
          Vertices.hull = function(vertices) {
            var upper = [], lower = [], vertex, i;
            vertices = vertices.slice(0);
            vertices.sort(function(vertexA, vertexB) {
              var dx = vertexA.x - vertexB.x;
              return dx !== 0 ? dx : vertexA.y - vertexB.y;
            });
            for (i = 0; i < vertices.length; i += 1) {
              vertex = vertices[i];
              while (lower.length >= 2 && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                lower.pop();
              }
              lower.push(vertex);
            }
            for (i = vertices.length - 1; i >= 0; i -= 1) {
              vertex = vertices[i];
              while (upper.length >= 2 && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                upper.pop();
              }
              upper.push(vertex);
            }
            upper.pop();
            lower.pop();
            return upper.concat(lower);
          };
        })();
      }, { "../core/Common": 14, "../geometry/Vector": 28 }], 30: [function(_dereq_, module3, exports3) {
        var Matter = module3.exports = _dereq_("../core/Matter");
        Matter.Body = _dereq_("../body/Body");
        Matter.Composite = _dereq_("../body/Composite");
        Matter.World = _dereq_("../body/World");
        Matter.Contact = _dereq_("../collision/Contact");
        Matter.Detector = _dereq_("../collision/Detector");
        Matter.Grid = _dereq_("../collision/Grid");
        Matter.Pairs = _dereq_("../collision/Pairs");
        Matter.Pair = _dereq_("../collision/Pair");
        Matter.Query = _dereq_("../collision/Query");
        Matter.Resolver = _dereq_("../collision/Resolver");
        Matter.SAT = _dereq_("../collision/SAT");
        Matter.Constraint = _dereq_("../constraint/Constraint");
        Matter.MouseConstraint = _dereq_("../constraint/MouseConstraint");
        Matter.Common = _dereq_("../core/Common");
        Matter.Engine = _dereq_("../core/Engine");
        Matter.Events = _dereq_("../core/Events");
        Matter.Mouse = _dereq_("../core/Mouse");
        Matter.Runner = _dereq_("../core/Runner");
        Matter.Sleeping = _dereq_("../core/Sleeping");
        Matter.Plugin = _dereq_("../core/Plugin");
        Matter.Bodies = _dereq_("../factory/Bodies");
        Matter.Composites = _dereq_("../factory/Composites");
        Matter.Axes = _dereq_("../geometry/Axes");
        Matter.Bounds = _dereq_("../geometry/Bounds");
        Matter.Svg = _dereq_("../geometry/Svg");
        Matter.Vector = _dereq_("../geometry/Vector");
        Matter.Vertices = _dereq_("../geometry/Vertices");
        Matter.Render = _dereq_("../render/Render");
        Matter.RenderPixi = _dereq_("../render/RenderPixi");
        Matter.World.add = Matter.Composite.add;
        Matter.World.remove = Matter.Composite.remove;
        Matter.World.addComposite = Matter.Composite.addComposite;
        Matter.World.addBody = Matter.Composite.addBody;
        Matter.World.addConstraint = Matter.Composite.addConstraint;
        Matter.World.clear = Matter.Composite.clear;
        Matter.Engine.run = Matter.Runner.run;
      }, { "../body/Body": 1, "../body/Composite": 2, "../body/World": 3, "../collision/Contact": 4, "../collision/Detector": 5, "../collision/Grid": 6, "../collision/Pair": 7, "../collision/Pairs": 8, "../collision/Query": 9, "../collision/Resolver": 10, "../collision/SAT": 11, "../constraint/Constraint": 12, "../constraint/MouseConstraint": 13, "../core/Common": 14, "../core/Engine": 15, "../core/Events": 16, "../core/Matter": 17, "../core/Metrics": 18, "../core/Mouse": 19, "../core/Plugin": 20, "../core/Runner": 21, "../core/Sleeping": 22, "../factory/Bodies": 23, "../factory/Composites": 24, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Svg": 27, "../geometry/Vector": 28, "../geometry/Vertices": 29, "../render/Render": 31, "../render/RenderPixi": 32 }], 31: [function(_dereq_, module3, exports3) {
        var Render2 = {};
        module3.exports = Render2;
        var Common = _dereq_("../core/Common");
        var Composite = _dereq_("../body/Composite");
        var Bounds = _dereq_("../geometry/Bounds");
        var Events2 = _dereq_("../core/Events");
        var Grid = _dereq_("../collision/Grid");
        var Vector = _dereq_("../geometry/Vector");
        var Mouse2 = _dereq_("../core/Mouse");
        (function() {
          var _requestAnimationFrame, _cancelAnimationFrame;
          if (typeof window !== "undefined") {
            _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
              window.setTimeout(function() {
                callback(Common.now());
              }, 1e3 / 60);
            };
            _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
          }
          Render2.create = function(options) {
            var defaults = {
              controller: Render2,
              engine: null,
              element: null,
              canvas: null,
              mouse: null,
              frameRequestId: null,
              options: {
                width: 800,
                height: 600,
                pixelRatio: 1,
                background: "#18181d",
                wireframeBackground: "#0f0f13",
                hasBounds: !!options.bounds,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: false,
                showMousePosition: false
              }
            };
            var render = Common.extend(defaults, options);
            if (render.canvas) {
              render.canvas.width = render.options.width || render.canvas.width;
              render.canvas.height = render.options.height || render.canvas.height;
            }
            render.mouse = options.mouse;
            render.engine = options.engine;
            render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
            render.context = render.canvas.getContext("2d");
            render.textures = {};
            render.bounds = render.bounds || {
              min: {
                x: 0,
                y: 0
              },
              max: {
                x: render.canvas.width,
                y: render.canvas.height
              }
            };
            if (render.options.pixelRatio !== 1) {
              Render2.setPixelRatio(render, render.options.pixelRatio);
            }
            if (Common.isElement(render.element)) {
              render.element.appendChild(render.canvas);
            } else if (!render.canvas.parentNode) {
              Common.log("Render.create: options.element was undefined, render.canvas was created but not appended", "warn");
            }
            return render;
          };
          Render2.run = function(render) {
            (function loop(time) {
              render.frameRequestId = _requestAnimationFrame(loop);
              Render2.world(render);
            })();
          };
          Render2.stop = function(render) {
            _cancelAnimationFrame(render.frameRequestId);
          };
          Render2.setPixelRatio = function(render, pixelRatio) {
            var options = render.options, canvas = render.canvas;
            if (pixelRatio === "auto") {
              pixelRatio = _getPixelRatio(canvas);
            }
            options.pixelRatio = pixelRatio;
            canvas.setAttribute("data-pixel-ratio", pixelRatio);
            canvas.width = options.width * pixelRatio;
            canvas.height = options.height * pixelRatio;
            canvas.style.width = options.width + "px";
            canvas.style.height = options.height + "px";
            render.context.scale(pixelRatio, pixelRatio);
          };
          Render2.lookAt = function(render, objects, padding, center) {
            center = typeof center !== "undefined" ? center : true;
            objects = Common.isArray(objects) ? objects : [objects];
            padding = padding || {
              x: 0,
              y: 0
            };
            var bounds = {
              min: { x: Infinity, y: Infinity },
              max: { x: -Infinity, y: -Infinity }
            };
            for (var i = 0; i < objects.length; i += 1) {
              var object = objects[i], min = object.bounds ? object.bounds.min : object.min || object.position || object, max = object.bounds ? object.bounds.max : object.max || object.position || object;
              if (min && max) {
                if (min.x < bounds.min.x)
                  bounds.min.x = min.x;
                if (max.x > bounds.max.x)
                  bounds.max.x = max.x;
                if (min.y < bounds.min.y)
                  bounds.min.y = min.y;
                if (max.y > bounds.max.y)
                  bounds.max.y = max.y;
              }
            }
            var width = bounds.max.x - bounds.min.x + 2 * padding.x, height = bounds.max.y - bounds.min.y + 2 * padding.y, viewHeight = render.canvas.height, viewWidth = render.canvas.width, outerRatio = viewWidth / viewHeight, innerRatio = width / height, scaleX = 1, scaleY = 1;
            if (innerRatio > outerRatio) {
              scaleY = innerRatio / outerRatio;
            } else {
              scaleX = outerRatio / innerRatio;
            }
            render.options.hasBounds = true;
            render.bounds.min.x = bounds.min.x;
            render.bounds.max.x = bounds.min.x + width * scaleX;
            render.bounds.min.y = bounds.min.y;
            render.bounds.max.y = bounds.min.y + height * scaleY;
            if (center) {
              render.bounds.min.x += width * 0.5 - width * scaleX * 0.5;
              render.bounds.max.x += width * 0.5 - width * scaleX * 0.5;
              render.bounds.min.y += height * 0.5 - height * scaleY * 0.5;
              render.bounds.max.y += height * 0.5 - height * scaleY * 0.5;
            }
            render.bounds.min.x -= padding.x;
            render.bounds.max.x -= padding.x;
            render.bounds.min.y -= padding.y;
            render.bounds.max.y -= padding.y;
            if (render.mouse) {
              Mouse2.setScale(render.mouse, {
                x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
              });
              Mouse2.setOffset(render.mouse, render.bounds.min);
            }
          };
          Render2.startViewTransform = function(render) {
            var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
            render.context.scale(1 / boundsScaleX, 1 / boundsScaleY);
            render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
          };
          Render2.endViewTransform = function(render) {
            render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
          };
          Render2.world = function(render) {
            var engine = render.engine, world = engine.world, canvas = render.canvas, context = render.context, options = render.options, allBodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world), background = options.wireframes ? options.wireframeBackground : options.background, bodies = [], constraints = [], i;
            var event = {
              timestamp: engine.timing.timestamp
            };
            Events2.trigger(render, "beforeRender", event);
            if (render.currentBackground !== background)
              _applyBackground(render, background);
            context.globalCompositeOperation = "source-in";
            context.fillStyle = "transparent";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = "source-over";
            if (options.hasBounds) {
              for (i = 0; i < allBodies.length; i++) {
                var body = allBodies[i];
                if (Bounds.overlaps(body.bounds, render.bounds))
                  bodies.push(body);
              }
              for (i = 0; i < allConstraints.length; i++) {
                var constraint = allConstraints[i], bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointAWorld = constraint.pointA, pointBWorld = constraint.pointB;
                if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);
                if (!pointAWorld || !pointBWorld)
                  continue;
                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                  constraints.push(constraint);
              }
              Render2.startViewTransform(render);
              if (render.mouse) {
                Mouse2.setScale(render.mouse, {
                  x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                  y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
                });
                Mouse2.setOffset(render.mouse, render.bounds.min);
              }
            } else {
              constraints = allConstraints;
              bodies = allBodies;
            }
            if (!options.wireframes || engine.enableSleeping && options.showSleeping) {
              Render2.bodies(render, bodies, context);
            } else {
              if (options.showConvexHulls)
                Render2.bodyConvexHulls(render, bodies, context);
              Render2.bodyWireframes(render, bodies, context);
            }
            if (options.showBounds)
              Render2.bodyBounds(render, bodies, context);
            if (options.showAxes || options.showAngleIndicator)
              Render2.bodyAxes(render, bodies, context);
            if (options.showPositions)
              Render2.bodyPositions(render, bodies, context);
            if (options.showVelocity)
              Render2.bodyVelocity(render, bodies, context);
            if (options.showIds)
              Render2.bodyIds(render, bodies, context);
            if (options.showSeparations)
              Render2.separations(render, engine.pairs.list, context);
            if (options.showCollisions)
              Render2.collisions(render, engine.pairs.list, context);
            if (options.showVertexNumbers)
              Render2.vertexNumbers(render, bodies, context);
            if (options.showMousePosition)
              Render2.mousePosition(render, render.mouse, context);
            Render2.constraints(constraints, context);
            if (options.showBroadphase && engine.broadphase.controller === Grid)
              Render2.grid(render, engine.broadphase, context);
            if (options.showDebug)
              Render2.debug(render, context);
            if (options.hasBounds) {
              Render2.endViewTransform(render);
            }
            Events2.trigger(render, "afterRender", event);
          };
          Render2.debug = function(render, context) {
            var c = context, engine = render.engine, world = engine.world, metrics = engine.metrics, options = render.options, bodies = Composite.allBodies(world), space = "    ";
            if (engine.timing.timestamp - (render.debugTimestamp || 0) >= 500) {
              var text = "";
              if (metrics.timing) {
                text += "fps: " + Math.round(metrics.timing.fps) + space;
              }
              render.debugString = text;
              render.debugTimestamp = engine.timing.timestamp;
            }
            if (render.debugString) {
              c.font = "12px Arial";
              if (options.wireframes) {
                c.fillStyle = "rgba(255,255,255,0.5)";
              } else {
                c.fillStyle = "rgba(0,0,0,0.5)";
              }
              var split = render.debugString.split("\n");
              for (var i = 0; i < split.length; i++) {
                c.fillText(split[i], 50, 50 + i * 18);
              }
            }
          };
          Render2.constraints = function(constraints, context) {
            var c = context;
            for (var i = 0; i < constraints.length; i++) {
              var constraint = constraints[i];
              if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
                continue;
              var bodyA = constraint.bodyA, bodyB = constraint.bodyB, start, end;
              if (bodyA) {
                start = Vector.add(bodyA.position, constraint.pointA);
              } else {
                start = constraint.pointA;
              }
              if (constraint.render.type === "pin") {
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.closePath();
              } else {
                if (bodyB) {
                  end = Vector.add(bodyB.position, constraint.pointB);
                } else {
                  end = constraint.pointB;
                }
                c.beginPath();
                c.moveTo(start.x, start.y);
                if (constraint.render.type === "spring") {
                  var delta = Vector.sub(end, start), normal = Vector.perp(Vector.normalise(delta)), coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20)), offset;
                  for (var j = 1; j < coils; j += 1) {
                    offset = j % 2 === 0 ? 1 : -1;
                    c.lineTo(
                      start.x + delta.x * (j / coils) + normal.x * offset * 4,
                      start.y + delta.y * (j / coils) + normal.y * offset * 4
                    );
                  }
                }
                c.lineTo(end.x, end.y);
              }
              if (constraint.render.lineWidth) {
                c.lineWidth = constraint.render.lineWidth;
                c.strokeStyle = constraint.render.strokeStyle;
                c.stroke();
              }
              if (constraint.render.anchors) {
                c.fillStyle = constraint.render.strokeStyle;
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
                c.closePath();
                c.fill();
              }
            }
          };
          Render2.bodyShadows = function(render, bodies, context) {
            var c = context, engine = render.engine;
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (!body.render.visible)
                continue;
              if (body.circleRadius) {
                c.beginPath();
                c.arc(body.position.x, body.position.y, body.circleRadius, 0, 2 * Math.PI);
                c.closePath();
              } else {
                c.beginPath();
                c.moveTo(body.vertices[0].x, body.vertices[0].y);
                for (var j = 1; j < body.vertices.length; j++) {
                  c.lineTo(body.vertices[j].x, body.vertices[j].y);
                }
                c.closePath();
              }
              var distanceX = body.position.x - render.options.width * 0.5, distanceY = body.position.y - render.options.height * 0.2, distance = Math.abs(distanceX) + Math.abs(distanceY);
              c.shadowColor = "rgba(0,0,0,0.15)";
              c.shadowOffsetX = 0.05 * distanceX;
              c.shadowOffsetY = 0.05 * distanceY;
              c.shadowBlur = 1 + 12 * Math.min(1, distance / 1e3);
              c.fill();
              c.shadowColor = null;
              c.shadowOffsetX = null;
              c.shadowOffsetY = null;
              c.shadowBlur = null;
            }
          };
          Render2.bodies = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, showInternalEdges = options.showInternalEdges || !options.wireframes, body, part, i, k;
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];
                if (!part.render.visible)
                  continue;
                if (options.showSleeping && body.isSleeping) {
                  c.globalAlpha = 0.5 * part.render.opacity;
                } else if (part.render.opacity !== 1) {
                  c.globalAlpha = part.render.opacity;
                }
                if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                  var sprite = part.render.sprite, texture = _getTexture(render, sprite.texture);
                  c.translate(part.position.x, part.position.y);
                  c.rotate(part.angle);
                  c.drawImage(
                    texture,
                    texture.width * -sprite.xOffset * sprite.xScale,
                    texture.height * -sprite.yOffset * sprite.yScale,
                    texture.width * sprite.xScale,
                    texture.height * sprite.yScale
                  );
                  c.rotate(-part.angle);
                  c.translate(-part.position.x, -part.position.y);
                } else {
                  if (part.circleRadius) {
                    c.beginPath();
                    c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
                  } else {
                    c.beginPath();
                    c.moveTo(part.vertices[0].x, part.vertices[0].y);
                    for (var j = 1; j < part.vertices.length; j++) {
                      if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                        c.lineTo(part.vertices[j].x, part.vertices[j].y);
                      } else {
                        c.moveTo(part.vertices[j].x, part.vertices[j].y);
                      }
                      if (part.vertices[j].isInternal && !showInternalEdges) {
                        c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                      }
                    }
                    c.lineTo(part.vertices[0].x, part.vertices[0].y);
                    c.closePath();
                  }
                  if (!options.wireframes) {
                    c.fillStyle = part.render.fillStyle;
                    if (part.render.lineWidth) {
                      c.lineWidth = part.render.lineWidth;
                      c.strokeStyle = part.render.strokeStyle;
                      c.stroke();
                    }
                    c.fill();
                  } else {
                    c.lineWidth = 1;
                    c.strokeStyle = "#bbb";
                    c.stroke();
                  }
                }
                c.globalAlpha = 1;
              }
            }
          };
          Render2.bodyWireframes = function(render, bodies, context) {
            var c = context, showInternalEdges = render.options.showInternalEdges, body, part, i, j, k;
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];
                c.moveTo(part.vertices[0].x, part.vertices[0].y);
                for (j = 1; j < part.vertices.length; j++) {
                  if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                    c.lineTo(part.vertices[j].x, part.vertices[j].y);
                  } else {
                    c.moveTo(part.vertices[j].x, part.vertices[j].y);
                  }
                  if (part.vertices[j].isInternal && !showInternalEdges) {
                    c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                  }
                }
                c.lineTo(part.vertices[0].x, part.vertices[0].y);
              }
            }
            c.lineWidth = 1;
            c.strokeStyle = "#bbb";
            c.stroke();
          };
          Render2.bodyConvexHulls = function(render, bodies, context) {
            var c = context, body, part, i, j, k;
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible || body.parts.length === 1)
                continue;
              c.moveTo(body.vertices[0].x, body.vertices[0].y);
              for (j = 1; j < body.vertices.length; j++) {
                c.lineTo(body.vertices[j].x, body.vertices[j].y);
              }
              c.lineTo(body.vertices[0].x, body.vertices[0].y);
            }
            c.lineWidth = 1;
            c.strokeStyle = "rgba(255,255,255,0.2)";
            c.stroke();
          };
          Render2.vertexNumbers = function(render, bodies, context) {
            var c = context, i, j, k;
            for (i = 0; i < bodies.length; i++) {
              var parts = bodies[i].parts;
              for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
                var part = parts[k];
                for (j = 0; j < part.vertices.length; j++) {
                  c.fillStyle = "rgba(255,255,255,0.2)";
                  c.fillText(i + "_" + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                }
              }
            }
          };
          Render2.mousePosition = function(render, mouse, context) {
            var c = context;
            c.fillStyle = "rgba(255,255,255,0.8)";
            c.fillText(mouse.position.x + "  " + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
          };
          Render2.bodyBounds = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options;
            c.beginPath();
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (body.render.visible) {
                var parts = bodies[i].parts;
                for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                  var part = parts[j];
                  c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                }
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,255,255,0.08)";
            } else {
              c.strokeStyle = "rgba(0,0,0,0.1)";
            }
            c.lineWidth = 1;
            c.stroke();
          };
          Render2.bodyAxes = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, part, i, j, k;
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              var body = bodies[i], parts = body.parts;
              if (!body.render.visible)
                continue;
              if (options.showAxes) {
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                  part = parts[j];
                  for (k = 0; k < part.axes.length; k++) {
                    var axis = part.axes[k];
                    c.moveTo(part.position.x, part.position.y);
                    c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                  }
                }
              } else {
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                  part = parts[j];
                  for (k = 0; k < part.axes.length; k++) {
                    c.moveTo(part.position.x, part.position.y);
                    c.lineTo(
                      (part.vertices[0].x + part.vertices[part.vertices.length - 1].x) / 2,
                      (part.vertices[0].y + part.vertices[part.vertices.length - 1].y) / 2
                    );
                  }
                }
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "indianred";
              c.lineWidth = 1;
            } else {
              c.strokeStyle = "rgba(255, 255, 255, 0.4)";
              c.globalCompositeOperation = "overlay";
              c.lineWidth = 2;
            }
            c.stroke();
            c.globalCompositeOperation = "source-over";
          };
          Render2.bodyPositions = function(render, bodies, context) {
            var c = context, engine = render.engine, options = render.options, body, part, i, k;
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (!body.render.visible)
                continue;
              for (k = 0; k < body.parts.length; k++) {
                part = body.parts[k];
                c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
                c.closePath();
              }
            }
            if (options.wireframes) {
              c.fillStyle = "indianred";
            } else {
              c.fillStyle = "rgba(0,0,0,0.5)";
            }
            c.fill();
            c.beginPath();
            for (i = 0; i < bodies.length; i++) {
              body = bodies[i];
              if (body.render.visible) {
                c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
                c.closePath();
              }
            }
            c.fillStyle = "rgba(255,165,0,0.8)";
            c.fill();
          };
          Render2.bodyVelocity = function(render, bodies, context) {
            var c = context;
            c.beginPath();
            for (var i = 0; i < bodies.length; i++) {
              var body = bodies[i];
              if (!body.render.visible)
                continue;
              c.moveTo(body.position.x, body.position.y);
              c.lineTo(body.position.x + (body.position.x - body.positionPrev.x) * 2, body.position.y + (body.position.y - body.positionPrev.y) * 2);
            }
            c.lineWidth = 3;
            c.strokeStyle = "cornflowerblue";
            c.stroke();
          };
          Render2.bodyIds = function(render, bodies, context) {
            var c = context, i, j;
            for (i = 0; i < bodies.length; i++) {
              if (!bodies[i].render.visible)
                continue;
              var parts = bodies[i].parts;
              for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                var part = parts[j];
                c.font = "12px Arial";
                c.fillStyle = "rgba(255,255,255,0.5)";
                c.fillText(part.id, part.position.x + 10, part.position.y - 10);
              }
            }
          };
          Render2.collisions = function(render, pairs, context) {
            var c = context, options = render.options, pair, collision, corrected, bodyA, bodyB, i, j;
            c.beginPath();
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              for (j = 0; j < pair.activeContacts.length; j++) {
                var contact = pair.activeContacts[j], vertex = contact.vertex;
                c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
              }
            }
            if (options.wireframes) {
              c.fillStyle = "rgba(255,255,255,0.7)";
            } else {
              c.fillStyle = "orange";
            }
            c.fill();
            c.beginPath();
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              if (pair.activeContacts.length > 0) {
                var normalPosX = pair.activeContacts[0].vertex.x, normalPosY = pair.activeContacts[0].vertex.y;
                if (pair.activeContacts.length === 2) {
                  normalPosX = (pair.activeContacts[0].vertex.x + pair.activeContacts[1].vertex.x) / 2;
                  normalPosY = (pair.activeContacts[0].vertex.y + pair.activeContacts[1].vertex.y) / 2;
                }
                if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                  c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                } else {
                  c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                }
                c.lineTo(normalPosX, normalPosY);
              }
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,165,0,0.7)";
            } else {
              c.strokeStyle = "orange";
            }
            c.lineWidth = 1;
            c.stroke();
          };
          Render2.separations = function(render, pairs, context) {
            var c = context, options = render.options, pair, collision, corrected, bodyA, bodyB, i, j;
            c.beginPath();
            for (i = 0; i < pairs.length; i++) {
              pair = pairs[i];
              if (!pair.isActive)
                continue;
              collision = pair.collision;
              bodyA = collision.bodyA;
              bodyB = collision.bodyB;
              var k = 1;
              if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
              if (bodyB.isStatic) k = 0;
              c.moveTo(bodyB.position.x, bodyB.position.y);
              c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);
              k = 1;
              if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
              if (bodyA.isStatic) k = 0;
              c.moveTo(bodyA.position.x, bodyA.position.y);
              c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
            }
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,165,0,0.5)";
            } else {
              c.strokeStyle = "orange";
            }
            c.stroke();
          };
          Render2.grid = function(render, grid, context) {
            var c = context, options = render.options;
            if (options.wireframes) {
              c.strokeStyle = "rgba(255,180,0,0.1)";
            } else {
              c.strokeStyle = "rgba(255,180,0,0.5)";
            }
            c.beginPath();
            var bucketKeys = Common.keys(grid.buckets);
            for (var i = 0; i < bucketKeys.length; i++) {
              var bucketId = bucketKeys[i];
              if (grid.buckets[bucketId].length < 2)
                continue;
              var region = bucketId.split(/C|R/);
              c.rect(
                0.5 + parseInt(region[1], 10) * grid.bucketWidth,
                0.5 + parseInt(region[2], 10) * grid.bucketHeight,
                grid.bucketWidth,
                grid.bucketHeight
              );
            }
            c.lineWidth = 1;
            c.stroke();
          };
          Render2.inspector = function(inspector, context) {
            var engine = inspector.engine, selected = inspector.selected, render = inspector.render, options = render.options, bounds;
            if (options.hasBounds) {
              var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
              context.scale(1 / boundsScaleX, 1 / boundsScaleY);
              context.translate(-render.bounds.min.x, -render.bounds.min.y);
            }
            for (var i = 0; i < selected.length; i++) {
              var item = selected[i].data;
              context.translate(0.5, 0.5);
              context.lineWidth = 1;
              context.strokeStyle = "rgba(255,165,0,0.9)";
              context.setLineDash([1, 2]);
              switch (item.type) {
                case "body":
                  bounds = item.bounds;
                  context.beginPath();
                  context.rect(
                    Math.floor(bounds.min.x - 3),
                    Math.floor(bounds.min.y - 3),
                    Math.floor(bounds.max.x - bounds.min.x + 6),
                    Math.floor(bounds.max.y - bounds.min.y + 6)
                  );
                  context.closePath();
                  context.stroke();
                  break;
                case "constraint":
                  var point = item.pointA;
                  if (item.bodyA)
                    point = item.pointB;
                  context.beginPath();
                  context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                  context.closePath();
                  context.stroke();
                  break;
              }
              context.setLineDash([]);
              context.translate(-0.5, -0.5);
            }
            if (inspector.selectStart !== null) {
              context.translate(0.5, 0.5);
              context.lineWidth = 1;
              context.strokeStyle = "rgba(255,165,0,0.6)";
              context.fillStyle = "rgba(255,165,0,0.1)";
              bounds = inspector.selectBounds;
              context.beginPath();
              context.rect(
                Math.floor(bounds.min.x),
                Math.floor(bounds.min.y),
                Math.floor(bounds.max.x - bounds.min.x),
                Math.floor(bounds.max.y - bounds.min.y)
              );
              context.closePath();
              context.stroke();
              context.fill();
              context.translate(-0.5, -0.5);
            }
            if (options.hasBounds)
              context.setTransform(1, 0, 0, 1, 0, 0);
          };
          var _createCanvas = function(width, height) {
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.oncontextmenu = function() {
              return false;
            };
            canvas.onselectstart = function() {
              return false;
            };
            return canvas;
          };
          var _getPixelRatio = function(canvas) {
            var context = canvas.getContext("2d"), devicePixelRatio = window.devicePixelRatio || 1, backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
            return devicePixelRatio / backingStorePixelRatio;
          };
          var _getTexture = function(render, imagePath) {
            var image = render.textures[imagePath];
            if (image)
              return image;
            image = render.textures[imagePath] = new Image();
            image.src = imagePath;
            return image;
          };
          var _applyBackground = function(render, background) {
            var cssBackground = background;
            if (/(jpg|gif|png)$/.test(background))
              cssBackground = "url(" + background + ")";
            render.canvas.style.background = cssBackground;
            render.canvas.style.backgroundSize = "contain";
            render.currentBackground = background;
          };
        })();
      }, { "../body/Composite": 2, "../collision/Grid": 6, "../core/Common": 14, "../core/Events": 16, "../core/Mouse": 19, "../geometry/Bounds": 26, "../geometry/Vector": 28 }], 32: [function(_dereq_, module3, exports3) {
        var RenderPixi = {};
        module3.exports = RenderPixi;
        var Bounds = _dereq_("../geometry/Bounds");
        var Composite = _dereq_("../body/Composite");
        var Common = _dereq_("../core/Common");
        var Events2 = _dereq_("../core/Events");
        var Vector = _dereq_("../geometry/Vector");
        (function() {
          var _requestAnimationFrame, _cancelAnimationFrame;
          if (typeof window !== "undefined") {
            _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
              window.setTimeout(function() {
                callback(Common.now());
              }, 1e3 / 60);
            };
            _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
          }
          RenderPixi.create = function(options) {
            Common.warn("RenderPixi.create: Matter.RenderPixi is deprecated (see docs)");
            var defaults = {
              controller: RenderPixi,
              engine: null,
              element: null,
              frameRequestId: null,
              canvas: null,
              renderer: null,
              container: null,
              spriteContainer: null,
              pixiOptions: null,
              options: {
                width: 800,
                height: 600,
                background: "#fafafa",
                wireframeBackground: "#222",
                hasBounds: false,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false
              }
            };
            var render = Common.extend(defaults, options), transparent = !render.options.wireframes && render.options.background === "transparent";
            render.pixiOptions = render.pixiOptions || {
              view: render.canvas,
              transparent,
              antialias: true,
              backgroundColor: options.background
            };
            render.mouse = options.mouse;
            render.engine = options.engine;
            render.renderer = render.renderer || new PIXI.WebGLRenderer(render.options.width, render.options.height, render.pixiOptions);
            render.container = render.container || new PIXI.Container();
            render.spriteContainer = render.spriteContainer || new PIXI.Container();
            render.canvas = render.canvas || render.renderer.view;
            render.bounds = render.bounds || {
              min: {
                x: 0,
                y: 0
              },
              max: {
                x: render.options.width,
                y: render.options.height
              }
            };
            Events2.on(render.engine, "beforeUpdate", function() {
              RenderPixi.clear(render);
            });
            render.textures = {};
            render.sprites = {};
            render.primitives = {};
            render.container.addChild(render.spriteContainer);
            if (Common.isElement(render.element)) {
              render.element.appendChild(render.canvas);
            } else {
              Common.warn('No "render.element" passed, "render.canvas" was not inserted into document.');
            }
            render.canvas.oncontextmenu = function() {
              return false;
            };
            render.canvas.onselectstart = function() {
              return false;
            };
            return render;
          };
          RenderPixi.run = function(render) {
            (function loop(time) {
              render.frameRequestId = _requestAnimationFrame(loop);
              RenderPixi.world(render);
            })();
          };
          RenderPixi.stop = function(render) {
            _cancelAnimationFrame(render.frameRequestId);
          };
          RenderPixi.clear = function(render) {
            var container = render.container, spriteContainer = render.spriteContainer;
            while (container.children[0]) {
              container.removeChild(container.children[0]);
            }
            while (spriteContainer.children[0]) {
              spriteContainer.removeChild(spriteContainer.children[0]);
            }
            var bgSprite = render.sprites["bg-0"];
            render.textures = {};
            render.sprites = {};
            render.primitives = {};
            render.sprites["bg-0"] = bgSprite;
            if (bgSprite)
              container.addChildAt(bgSprite, 0);
            render.container.addChild(render.spriteContainer);
            render.currentBackground = null;
            container.scale.set(1, 1);
            container.position.set(0, 0);
          };
          RenderPixi.setBackground = function(render, background) {
            if (render.currentBackground !== background) {
              var isColor = background.indexOf && background.indexOf("#") !== -1, bgSprite = render.sprites["bg-0"];
              if (isColor) {
                var color = Common.colorToNumber(background);
                render.renderer.backgroundColor = color;
                if (bgSprite)
                  render.container.removeChild(bgSprite);
              } else {
                if (!bgSprite) {
                  var texture = _getTexture(render, background);
                  bgSprite = render.sprites["bg-0"] = new PIXI.Sprite(texture);
                  bgSprite.position.x = 0;
                  bgSprite.position.y = 0;
                  render.container.addChildAt(bgSprite, 0);
                }
              }
              render.currentBackground = background;
            }
          };
          RenderPixi.world = function(render) {
            var engine = render.engine, world = engine.world, renderer = render.renderer, container = render.container, options = render.options, bodies = Composite.allBodies(world), allConstraints = Composite.allConstraints(world), constraints = [], i;
            if (options.wireframes) {
              RenderPixi.setBackground(render, options.wireframeBackground);
            } else {
              RenderPixi.setBackground(render, options.background);
            }
            var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
            if (options.hasBounds) {
              for (i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                body.render.sprite.visible = Bounds.overlaps(body.bounds, render.bounds);
              }
              for (i = 0; i < allConstraints.length; i++) {
                var constraint = allConstraints[i], bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointAWorld = constraint.pointA, pointBWorld = constraint.pointB;
                if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);
                if (!pointAWorld || !pointBWorld)
                  continue;
                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                  constraints.push(constraint);
              }
              container.scale.set(1 / boundsScaleX, 1 / boundsScaleY);
              container.position.set(-render.bounds.min.x * (1 / boundsScaleX), -render.bounds.min.y * (1 / boundsScaleY));
            } else {
              constraints = allConstraints;
            }
            for (i = 0; i < bodies.length; i++)
              RenderPixi.body(render, bodies[i]);
            for (i = 0; i < constraints.length; i++)
              RenderPixi.constraint(render, constraints[i]);
            renderer.render(container);
          };
          RenderPixi.constraint = function(render, constraint) {
            var engine = render.engine, bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointA = constraint.pointA, pointB = constraint.pointB, container = render.container, constraintRender = constraint.render, primitiveId = "c-" + constraint.id, primitive = render.primitives[primitiveId];
            if (!primitive)
              primitive = render.primitives[primitiveId] = new PIXI.Graphics();
            if (!constraintRender.visible || !constraint.pointA || !constraint.pointB) {
              primitive.clear();
              return;
            }
            if (Common.indexOf(container.children, primitive) === -1)
              container.addChild(primitive);
            primitive.clear();
            primitive.beginFill(0, 0);
            primitive.lineStyle(constraintRender.lineWidth, Common.colorToNumber(constraintRender.strokeStyle), 1);
            if (bodyA) {
              primitive.moveTo(bodyA.position.x + pointA.x, bodyA.position.y + pointA.y);
            } else {
              primitive.moveTo(pointA.x, pointA.y);
            }
            if (bodyB) {
              primitive.lineTo(bodyB.position.x + pointB.x, bodyB.position.y + pointB.y);
            } else {
              primitive.lineTo(pointB.x, pointB.y);
            }
            primitive.endFill();
          };
          RenderPixi.body = function(render, body) {
            var engine = render.engine, bodyRender = body.render;
            if (!bodyRender.visible)
              return;
            if (bodyRender.sprite && bodyRender.sprite.texture) {
              var spriteId = "b-" + body.id, sprite = render.sprites[spriteId], spriteContainer = render.spriteContainer;
              if (!sprite)
                sprite = render.sprites[spriteId] = _createBodySprite(render, body);
              if (Common.indexOf(spriteContainer.children, sprite) === -1)
                spriteContainer.addChild(sprite);
              sprite.position.x = body.position.x;
              sprite.position.y = body.position.y;
              sprite.rotation = body.angle;
              sprite.scale.x = bodyRender.sprite.xScale || 1;
              sprite.scale.y = bodyRender.sprite.yScale || 1;
            } else {
              var primitiveId = "b-" + body.id, primitive = render.primitives[primitiveId], container = render.container;
              if (!primitive) {
                primitive = render.primitives[primitiveId] = _createBodyPrimitive(render, body);
                primitive.initialAngle = body.angle;
              }
              if (Common.indexOf(container.children, primitive) === -1)
                container.addChild(primitive);
              primitive.position.x = body.position.x;
              primitive.position.y = body.position.y;
              primitive.rotation = body.angle - primitive.initialAngle;
            }
          };
          var _createBodySprite = function(render, body) {
            var bodyRender = body.render, texturePath = bodyRender.sprite.texture, texture = _getTexture(render, texturePath), sprite = new PIXI.Sprite(texture);
            sprite.anchor.x = body.render.sprite.xOffset;
            sprite.anchor.y = body.render.sprite.yOffset;
            return sprite;
          };
          var _createBodyPrimitive = function(render, body) {
            var bodyRender = body.render, options = render.options, primitive = new PIXI.Graphics(), fillStyle = Common.colorToNumber(bodyRender.fillStyle), strokeStyle = Common.colorToNumber(bodyRender.strokeStyle), strokeStyleIndicator = Common.colorToNumber(bodyRender.strokeStyle), strokeStyleWireframe = Common.colorToNumber("#bbb"), strokeStyleWireframeIndicator = Common.colorToNumber("#CD5C5C"), part;
            primitive.clear();
            for (var k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
              part = body.parts[k];
              if (!options.wireframes) {
                primitive.beginFill(fillStyle, 1);
                primitive.lineStyle(bodyRender.lineWidth, strokeStyle, 1);
              } else {
                primitive.beginFill(0, 0);
                primitive.lineStyle(1, strokeStyleWireframe, 1);
              }
              primitive.moveTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);
              for (var j = 1; j < part.vertices.length; j++) {
                primitive.lineTo(part.vertices[j].x - body.position.x, part.vertices[j].y - body.position.y);
              }
              primitive.lineTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);
              primitive.endFill();
              if (options.showAngleIndicator || options.showAxes) {
                primitive.beginFill(0, 0);
                if (options.wireframes) {
                  primitive.lineStyle(1, strokeStyleWireframeIndicator, 1);
                } else {
                  primitive.lineStyle(1, strokeStyleIndicator);
                }
                primitive.moveTo(part.position.x - body.position.x, part.position.y - body.position.y);
                primitive.lineTo(
                  (part.vertices[0].x + part.vertices[part.vertices.length - 1].x) / 2 - body.position.x,
                  (part.vertices[0].y + part.vertices[part.vertices.length - 1].y) / 2 - body.position.y
                );
                primitive.endFill();
              }
            }
            return primitive;
          };
          var _getTexture = function(render, imagePath) {
            var texture = render.textures[imagePath];
            if (!texture)
              texture = render.textures[imagePath] = PIXI.Texture.fromImage(imagePath);
            return texture;
          };
        })();
      }, { "../body/Composite": 2, "../core/Common": 14, "../core/Events": 16, "../geometry/Bounds": 26, "../geometry/Vector": 28 }] }, {}, [30])(30);
    });
  }
});

// matter-stub.js
var import_matter_js = __toESM(require_matter());
var export_Bodies = import_matter_js.Bodies;
var export_Body = import_matter_js.Body;
var export_Engine = import_matter_js.Engine;
var export_Events = import_matter_js.Events;
var export_Mouse = import_matter_js.Mouse;
var export_MouseConstraint = import_matter_js.MouseConstraint;
var export_Render = import_matter_js.Render;
var export_World = import_matter_js.World;
export {
  export_Bodies as Bodies,
  export_Body as Body,
  export_Engine as Engine,
  export_Events as Events,
  export_Mouse as Mouse,
  export_MouseConstraint as MouseConstraint,
  export_Render as Render,
  export_World as World
};
