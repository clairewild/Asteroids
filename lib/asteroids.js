const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  let game = new Game();
  let gameView = new GameView(game, ctx);
  gameView.start();
});
