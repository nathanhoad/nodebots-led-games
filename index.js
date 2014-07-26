var j5 = require('johnny-five'),
    Game = require('./src/game');

var board,
    game,
    button1,
    button2;


board = new j5.Board();

board.on('ready', function () {
  console.log('Ready...');
  
  game = new Game();
  
  this.repl.inject({
    game: game
  });
});