var j5 = require('johnny-five');


var Game = function () {
  var game = this;
  
  game.POSITION_NEUTRAL = 3;
  game.POSITION_PLAYER_1 = 6;
  game.POSITION_PLAYER_2 = 0;
  
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
    game.checkDeflection(1);
  });
  
  button2.on('up', function () {
    game.checkDeflection(2);
  });
  
  // Start the game already
  game.restart();
}


Game.prototype.restart = function () {
  var game = this;
  
  // Reset all the variables
  game.position = game.POSITION_NEUTRAL;
  game.direction = (Math.random() > 0.5) ? 1 : -1;
  game.inDanger = false;
  game.over = true;
  
  // Stop all of the LEDs
  for (var i = 0; i < game.leds.length; i++) {
    game.leds[i].stop();
  }
  
  // Flash the starter light 3 times before restarting
  game.leds[game.POSITION_NEUTRAL].strobe(2000 / 4);
  setTimeout(function() {
    game.over = false;
    game.leds[game.POSITION_NEUTRAL].stop();
    
    game.bounceFaster(1);
    
    game.update();
  }, 2000);
  
  game.update();
}


Game.prototype.bounceFaster = function (speed) {
  var game = this;
  
  if (game.over) return;
  
  // Up the speed
  clearInterval(game.timer);
  
  if (speed) {
    game.speed = speed;
  } else if (game.speed < 20) {
    game.speed += 1;
  }
  
  game.timer = setInterval(function () {
    game.update();
  }, 1000 / game.speed);
}


Game.prototype.gameOver = function () {
  var game = this;
  
  game.over = true;
  game.leds[game.position].strobe(200);
  
  setTimeout(function () {
    game.restart();
  }, 2000);
}


Game.prototype.checkDeflection = function (player) {
  var game = this;
  
  if (player == 1 && game.position == game.POSITION_PLAYER_1) {
    game.inDanger = false;
  } else if (player == 2 && game.position == game.POSITION_PLAYER_2) {
    game.inDanger = false;
  }
}


Game.prototype.update = function () {
  var game = this;
  
  if ( ! game.over) {
    game.position += game.direction;
    
    // Has a player lost?
    if (game.position == game.POSITION_PLAYER_1 - 1 && game.inDanger) {
      game.position = game.POSITION_PLAYER_1;
      game.gameOver();
    } else if (game.position == game.POSITION_PLAYER_2 + 1 && game.inDanger) {
      game.position = game.POSITION_PLAYER_2;
      game.gameOver();
    }
    
    // Bounce the ball at each end
    if (game.position == game.POSITION_PLAYER_1) {
      game.direction = -1;
      game.inDanger = true;
      game.bounceFaster();
    } else if (game.position == game.POSITION_PLAYER_2) {
      game.direction = 1;
      game.inDanger = true;
      game.bounceFaster();
    }
    
    // Show position
    for (var i = 0; i < game.leds.length; i++) {
      if (i == game.position) {
        game.leds[i].on();
      } else {
        game.leds[i].off();
      }
    }
  }
}


module.exports = Game;