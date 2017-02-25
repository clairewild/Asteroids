const Asteroid = require("./asteroid");
const Ship = require("./ship");

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  let options = {};
  options.game = this;
  options.pos = Game.prototype.randomPosition();
  this.ship = new Ship(options);
}

Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 5;

Game.prototype.addAsteroids = function() {
  while (this.asteroids.length < Game.NUM_ASTEROIDS) {
    let options = {};
    options.pos = Game.prototype.randomPosition();
    options.game = this;
    let asteroid = new Asteroid(options);
    this.asteroids.push(asteroid);
  }
};

Game.prototype.randomPosition = function() {
  let x = Math.floor(Math.random() * Game.DIM_X);
  let y = Math.floor(Math.random() * Game.DIM_Y);
  return [x, y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects.forEach( function(obj) {
    obj.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects.forEach( function(obj) {
    obj.move();
  });
};

Game.prototype.wrap = function(pos) {
  if (pos[0] < 0) {
    pos[0] += Game.DIM_X;
  }
  else if (pos[0] > Game.DIM_X) {
    pos[0] -= Game.DIM_X;
  }
  if (pos[1] < 0) {
    pos[1] += Game.DIM_Y;
  }
  else if (pos[1] > Game.DIM_Y) {
    pos[1] -= Game.DIM_Y;
  }
};

Game.prototype.checkCollisions = function() {
  for (let i = 0; i < this.allObjects.length; i++) {
    for (let j = i + 1; j < this.allObjects.length; j++ ) {
      if (this.allObjects[i].isCollidedWith(this.allObjects[j])) {
        this.allObjects[i].collideWith(this.allObjects[j]);
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(obj) {
  let i = this.asteroids.indexOf(obj);
  this.asteroids.splice(i, 1);
};

Game.prototype.allObjects = function() {
  let objs = this.asteroids.slice();
  objs.push(this.ship);
  return objs;
};

module.exports = Game;
