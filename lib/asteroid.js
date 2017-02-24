const MovingObject = require("./moving_object");
const Utils = require("./utils");

function Asteroid(options) {
  options.vel = options.vel || Utils.randomVec(1);
  options.color = options.color || Asteroid.COLOR;
  options.radius = options.radius || Asteroid.RADIUS;
  MovingObject.call(this, options);
}

Utils.inherits(Asteroid, MovingObject);

Asteroid.COLOR = 'white';
Asteroid.RADIUS = 30;

module.exports = Asteroid;
