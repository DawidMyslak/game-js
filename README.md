# Game.js

Micro-framework for game development in JavaScript

# Sample usage

```javascript
var player = {
  position: { x: 100, y: 100 }
};

game

  .init(function (config) {
    config.fps(60); // set frame rate
    config.resolution({ width: 800, height: 600 }); // set canvas size
  })

  .load(function (content) {
    player.sprite = content.load('player.png'); // load player sprite
  })

  .update(function (delta) {
    player.position.x += delta * 0.1; // update player position
  })

  .draw(function (canvas) {
    canvas.clear(); // clear canvas
    canvas.draw(player.sprite, player.position); // draw player
  })

  .start();
```