const Utils = require("./utils");
const MovingObject = require("./moving_object");

function Ship(options) {
  options.vel = [0, 0];
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  MovingObject.call(this, options);
}

Ship.prototype.relocate = function() {
  this.vel = [0, 0];
  this.pos = this.game.randomPosition();
};

Ship.RADIUS = 10;
Ship.COLOR = "red";

Utils.inherits(Ship, MovingObject);

module.exports = Ship;
