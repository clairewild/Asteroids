function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  let [x, y] = this.pos;
  ctx.beginPath();
  ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  let [x1, y1] = this.pos;
  let [x2, y2] = otherObject.pos;
  console.log(x1, y1);
  let dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  return (dist < (this.radius + otherObject.radius));
};

MovingObject.prototype.collideWith = function(otherObject) {
  this.game.remove(otherObject);
  this.game.remove(this);
};

module.exports = MovingObject;
