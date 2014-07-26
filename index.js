var j5 = require('johnny-five'),
    TugOfWarGame = require('./src/tug-of-war'),
    HotPotatoGame = require('./src/hot-potato');

var board,
    game,
    button1,
    button2;


board = new j5.Board();

board.on('ready', function () {
  game = new TugOfWarGame();
  // game = new HotPotatoGame();
});