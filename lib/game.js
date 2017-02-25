const Asteroid = require("./asteroid");

function Game() {
  this.asteroids = [];
  this.addAsteroids();
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
  this.asteroids.forEach( function(ast) {
    ast.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( function(ast) {
    ast.move();
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
  for (let i = 0; i < this.asteroids.length; i++) {
    for (let j = i + 1; j < this.asteroids.length; j++ ) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        this.asteroids[i].collideWith(this.asteroids[j]);
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

module.exports = Game;
