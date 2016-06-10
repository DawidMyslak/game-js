var KEY = { LEFT: '37', UP: '38', RIGHT: '39', DOWN: '40' };

game

  .init(function (scope, config) {
    config.fps(60); // set frame rate
    config.size({ width: 800, height: 600 }); // set canvas size

    scope.player = {}; // create empty player object
    scope.player.position = { x: 100, y: 100 }; // set player position
  })

  .load(function (scope, sprites) {
    scope.player.sprite = sprites.load('player.png'); // load player sprite
  })

  .update(function (scope, keyboard, delta) {
    // update player position
    if (keyboard[KEY.LEFT]) scope.player.position.x -= delta * 0.1;
    if (keyboard[KEY.UP]) scope.player.position.y -= delta * 0.1;
    if (keyboard[KEY.RIGHT]) scope.player.position.x += delta * 0.1;
    if (keyboard[KEY.DOWN]) scope.player.position.y += delta * 0.1;
  })

  .draw(function (scope, canvas) {
    canvas.clear(); // clear canvas
    canvas.draw(scope.player); // draw player
  })

  .start();