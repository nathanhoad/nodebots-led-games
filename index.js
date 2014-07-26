var j5 = require('johnny-five');

var board,
    button1,
    score1,
    button2,
    score2;


board = new j5.Board();

board.on('ready', function () {
  console.log('Ready...');
  
  score1 = 0;
  score2 = 0;
  
  button1 = new j5.Button({ pin: 2 });
  button2 = new j5.Button({ pin: 3 });
  
  button1.on('up', function (value) {
    score1++;
    
    console.log('score: ' + (score1 - score2));
  });
  
  button2.on('up', function (value) {
    score2++;
    
    console.log('score: ' + (score1 - score2));
  });
  
  this.repl.inject({
    score1: score1,
    score2: score2
  });
});