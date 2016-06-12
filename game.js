var game = (function () {
  // animation polyfill
  requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.mozRequestAnimationFrame;

  // game loop data
  var _fps = 60,
    _interval = 1000 / _fps,
    _now = 0,
    _then = 0,
    _delta = 0;

  // canvas data
  var _canvas = document.createElement('canvas'),
    _context = _canvas.getContext('2d');
  _canvas.width = 800;
  _canvas.height = 600;

  // sprites data
  var _sprites = [],
    _loaded = 0;

  // user callbacks
  var $empty = function () { };
  var $init = $empty, $load = $empty, $events = $empty, $update = $empty, $draw = $empty;

  // content provider
  var $content = {
    load: function (src) {
      var sprite = {
        id: _sprites.length,
        image: new Image()
      };

      sprite.image.onload = function () {
        _loaded++;
        $run();
      };

      sprite.image.src = src;
      _sprites.push(sprite);
      return sprite.id;
    }
  };

  // keyboard provider
  var $keyboard = {
    on: function (type, listener) {
      addEventListener(type, listener);
    }
  };

  // canvas provider
  var $canvas = {
    draw: function (obj) {
      _context.drawImage(_sprites[obj.sprite].image, obj.position.x, obj.position.y);
    },
    clear: function () {
      _context.clearRect(0, 0, _canvas.width, _canvas.height);
    }
  };

  // config provider
  var $config = {
    fps: function (value) {
      _fps = value;
      _interval = 1000 / _fps;
    },
    resolution: function (obj) {
      _canvas.width = obj.width;
      _canvas.height = obj.height;
    }
  };

  // game loop
  function $loop(now) {
    if (now < _then + _interval) {
      requestAnimationFrame($loop);
      return;
    }

    _delta += now - _then;
    _then = now;

    var updates = 0;
    while (_delta >= _interval) {
      $update(_interval);
      updates++;

      _delta -= _interval;

      if (updates >= 100) {
        _delta = 0;
        break;
      }
    }

    $draw($canvas);
    requestAnimationFrame($loop);
  };

  // run game loop
  function $run() {
    if (_loaded === _sprites.length) {
      requestAnimationFrame($loop);
    }
  };

  // start game
  function $start() {
    $events($keyboard);
    $init($config);
    document.body.appendChild(_canvas);
    $load($content);
    $run();
  };

  // game interface
  return {
    init: function (callback) {
      $init = callback;
      return this;
    },
    load: function (callback) {
      $load = callback;
      return this;
    },
    events: function (callback) {
      $events = callback;
      return this;
    },
    update: function (callback) {
      $update = callback;
      return this;
    },
    draw: function (callback) {
      $draw = callback;
      return this;
    },
    start: function () {
      $start();
    }
  };
})();