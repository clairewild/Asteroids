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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Utils = __webpack_require__(4);

	function Asteroid(options) {
	  options.vel = options.vel || Utils.randomVec(5);
	  options.color = options.color || Asteroid.COLOR;
	  options.radius = options.radius || Asteroid.RADIUS;
	  MovingObject.call(this, options);
	}

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
	}

	MovingObject.prototype.draw = function(ctx) {
	  let [x, y] = this.pos;
	  ctx.beginPath();
	  ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
	  ctx.fillStyle = this.color;
	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
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
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	  }.bind(this), 20);
	};

	module.exports = GameView;


/***/ }
/******/ ]);
