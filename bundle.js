/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(5);

	document.addEventListener("DOMContentLoaded", function() {
	  let canvas = document.getElementById("game-canvas");
	  let ctx = canvas.getContext("2d");
	  let game = new Game();
	  let gameView = new GameView(game, ctx);
	  gameView.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const Ship = __webpack_require__(6);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Utils = __webpack_require__(4);
	const Ship = __webpack_require__(6);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	};

	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },

	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function () {
	  setInterval( function () {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }.bind(this), 20);
	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Utils = __webpack_require__(4);
	const MovingObject = __webpack_require__(3);

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


/***/ }
/******/ ]);