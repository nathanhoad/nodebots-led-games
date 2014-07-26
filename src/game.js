var j5 = require('johnny-five');


var Game = function () {
  var game = this;
  
  game.POSITION_NEUTRAL = 3;
  game.POSITION_WIN_1 = 6;
  game.POSITION_WIN_2 = 0;
  
  // Set up the LED rope
  game.leds = [];
  var ledPins = [4, 5, 6, 7, 8, 9, 10],
      led;
  for (var i = 0; i < ledPins.length; i++) {
    led = new j5.Led(ledPins[i]);
    game.leds.push(led);
  }
  
  // Set up the player buttons
  var button1 = new j5.Button({ pin: 3 });
  var button2 = new j5.Button({ pin: 2 });
  
  button1.on('up', function () {
    game.moveTowardsPlayer(1);
  });
  
  button2.on('up', function () {
    game.moveTowardsPlayer(2);
  });
  
  // Start the game already
  game.restart();
}


Game.prototype.restart = function () {
  var game = this;
  
  game.position = game.POSITION_NEUTRAL;
  game.over = false;
  
  for (var i = 0; i < game.leds.length; i++) {
    game.leds[i].stop();
  }
  
  game.update();
}


Game.prototype.gameOver = function () {
  var game = this;
  
  game.over = true;
  game.leds[game.position].strobe(200);
  game.leds[game.POSITION_NEUTRAL].on();
  
  setTimeout(function () {
    game.restart();
  }, 2000);
}


Game.prototype.moveTowardsPlayer = function (player) {
  var game = this;
  
  if (game.over) return;
  
  if (player == 1) {
    game.position++;
  } else if (player == 2) {
    game.position--;
  }
  
  if (game.position == game.POSITION_WIN_1 || game.position == game.POSITION_WIN_2) {
    game.gameOver();
  }
  
  game.update();
}


Game.prototype.update = function () {
  var game = this;
  
  // Show position
  for (var i = 0; i < game.leds.length; i++) {
    if (i == game.position) {
      game.leds[i].on();
    } else {
      game.leds[i].off();
    }
  }
}


module.exports = Game;