# Game.js

Micro-framework for game development in JavaScript

# Sample usage

```javascript
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
    scope.player.position.x += delta * 0.1;
  })

  .draw(function (scope, canvas) {
    canvas.clear(); // clear canvas
    canvas.draw(scope.player); // draw player
  })

  .start();
```