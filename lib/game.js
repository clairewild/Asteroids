const Asteroid = require("./asteroid");

function Game() {
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 2;

Game.prototype.addAsteroids = function() {
  while (this.asteroids.length < Game.NUM_ASTEROIDS) {
    let options = {};
    options.pos = Game.prototype.randomPosition();
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

module.exports = Game;
