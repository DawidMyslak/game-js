var SPEED = 0.1; // 100 px per second
var KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

var player = {
  position: { x: 100, y: 100 },
  speed: { x: 0, y: 0 }
};

game

  .init(function (config) {
    config.fps(60); // set frame rate
    config.resolution({ width: 800, height: 600 }); // set canvas size
  })

  .load(function (content) {
    player.sprite = content.load('player.png'); // load player sprite
  })

  .events(function (keyboard) {
    keyboard.on('keydown', function (event) {
      var key = event.keyCode;
      if (key === KEY.LEFT) player.speed.x = -SPEED;
      else if (key === KEY.UP) player.speed.y = -SPEED;
      else if (key === KEY.RIGHT) player.speed.x = SPEED;
      else if (key === KEY.DOWN) player.speed.y = SPEED;
    });
    
    keyboard.on('keyup', function (event) {
      var key = event.keyCode;
      if (key === KEY.LEFT || key === KEY.RIGHT) player.speed.x = 0;
      else if (key === KEY.UP || key === KEY.DOWN) player.speed.y = 0;
    });
  })

  .update(function (delta) {
    // update player position
    player.position.x += delta * player.speed.x;
    player.position.y += delta * player.speed.y;
  })

  .draw(function (canvas) {
    canvas.clear(); // clear canvas
    canvas.draw(player.sprite, player.position); // draw player
  })

  .start();