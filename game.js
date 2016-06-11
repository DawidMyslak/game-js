var game = (function () {

  // shared scope
  var _scope = {};

  // game loop data
  var _fps = 30,
    _interval = 1000 / _fps,
    _now = 0,
    _then = 0,
    _delta = 0;

  // canvas data
  var _canvas = document.createElement('canvas'),
    _context = _canvas.getContext('2d');
  _canvas.width = 480;
  _canvas.height = 320;

  // keyboard status
  var _keyboard = {};

  // sprites array
  var _sprites = [];

  // user callbacks
  var $init, $load, $update, $draw;

  // sprites provider
  var $sprites = {
    load: function (src) {
      var sprite = {
        id: _sprites.length,
        image: new Image(),
        loaded: false
      };

      sprite.image.onload = function () {
        sprite.loaded = true;
      };

      sprite.image.src = src;
      _sprites.push(sprite);
      return sprite.id;
    }
  };

  // canvas provider
  var $canvas = {
    draw: function (obj) {
      if (_sprites[obj.sprite].loaded) {
        _context.drawImage(_sprites[obj.sprite].image, obj.position.x, obj.position.y);
      }
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
    size: function (obj) {
      _canvas.width = obj.width;
      _canvas.height = obj.height;
    }
  };

  // game loop
  var $loop = function (now) {
    if (now < _then + _interval) {
      requestAnimationFrame($loop);
      return;
    }

    _delta += now - _then;
    _then = now;

    var updates = 0;
    while (_delta >= _interval) {
      $update(_scope, _keyboard, _interval);
      updates++;

      _delta -= _interval;

      if (updates >= 100) {
        _delta = 0;
        break;
      }
    }

    $draw(_scope, $canvas);
    requestAnimationFrame($loop);
  };

  // start game
  var $start = function () {
    addEventListener('keydown', function (event) {
      _keyboard[event.keyCode] = true;
    });

    addEventListener('keyup', function (event) {
      delete _keyboard[event.keyCode];
    });

    $init(_scope, $config);
    document.body.appendChild(_canvas);
    $load(_scope, $sprites);
    requestAnimationFrame($loop);
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