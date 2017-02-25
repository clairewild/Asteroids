const MovingObject = require("./moving_object");
const Utils = require("./utils");
const Ship = require("./ship");

function Asteroid(options) {
  options.vel = options.vel || Utils.randomVec(1);
  options.color = options.color || Asteroid.COLOR;
  options.radius = options.radius || Asteroid.RADIUS;
  MovingObject.call(this, options);
}

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};

Utils.inherits(Asteroid, MovingObject);

Asteroid.COLOR = 'white';
Asteroid.RADIUS = 30;

module.exports = Asteroid;
