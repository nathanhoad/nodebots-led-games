var j5 = require('johnny-five'),
    // Game = require('./src/tug-of-war');
    Game = require('./src/hot-potato');

var board,
    game,
    button1,
    button2;


board = new j5.Board();

board.on('ready', function () {
  game = new Game();
});