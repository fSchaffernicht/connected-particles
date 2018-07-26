// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  lineLength: 30,
  lineThickness: 1,
  particles: 300,
  speed: 9,
  dotSize: 4,
  direction: {
    up: false,
    right: false,
    left: false,
    down: false,
    random: true
  },
  mouseMove: true,
  click: false
};
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./modules/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function Base() {
  _classCallCheck(this, Base);

  var canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  this.config = _config2.default;
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
};

exports.default = Base;
},{"./modules/config":10}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var transformAlphaFromColor = exports.transformAlphaFromColor = function transformAlphaFromColor(currentColor, alpha) {
  var a = currentColor.split(' ').shift();
  var rounded = (alpha + '').split('.').shift();
  var test = 100 - rounded < 10 ? '0' + (100 - rounded) : 100 - rounded;
  return a + ' 0.' + test + ')';
};
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lines = function (_Base) {
  _inherits(Lines, _Base);

  function Lines() {
    _classCallCheck(this, Lines);

    return _possibleConstructorReturn(this, (Lines.__proto__ || Object.getPrototypeOf(Lines)).apply(this, arguments));
  }

  _createClass(Lines, [{
    key: 'drawTriangle',
    value: function drawTriangle(x1, y1, x2, y2, color) {
      this.ctx.beginPath();
      this.ctx.lineWidth = this.config.lineThickness;
      this.ctx.strokeStyle = color;
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }, {
    key: 'move',
    value: function move(circles) {
      var a = void 0;
      var x = void 0;
      var y = void 0;

      for (var index = 0, len = circles.length; index < len; index++) {
        for (var i = 0; i < len; i++) {
          var nextItem = circles[index + i];

          if (nextItem) {
            a = circles[i].radius * 2;
            x = Math.abs(circles[index].posX - nextItem.posX);
            y = Math.abs(circles[index].posY - nextItem.posY);
            var distance = Math.sqrt(x * x + y * y);

            if (a > distance) {
              this.drawTriangle(circles[index].posX, circles[index].posY, nextItem.posX, nextItem.posY, (0, _util.transformAlphaFromColor)(circles[index].color, distance));
            }
          }
        }
      }
    }
  }]);

  return Lines;
}(_base2.default);

exports.default = Lines;
},{"../base":6,"./util":7}],16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  var r = Math.max(0, Math.floor(Math.random() * 100));
  var g = Math.max(0, Math.floor(Math.random() * 50));
  var b = Math.max(0, Math.floor(Math.random() * 100));

  if (value) {
    return "rgba(" + r + "," + g + "," + b + ", 0." + value + ")";
  }

  return "rgba(" + r + "," + g + "," + b + ", " + 0.4 + ")";
};
},{}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = function (_Base) {
  _inherits(Circle, _Base);

  function Circle(size, posX, posY) {
    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));

    _this.size = size;

    if (_this.config.direction.up) {
      _this.dx = 0;
      _this.dy = -(Math.random() * (_this.config.speed / 10));
    } else if (_this.config.direction.right) {
      _this.dx = Math.random() * (_this.config.speed / 10);
      _this.dy = 0;
    } else if (_this.config.direction.down) {
      _this.dx = 0;
      _this.dy = Math.random() * (_this.config.speed / 10);
    } else if (_this.config.direction.left) {
      _this.dx = -(Math.random() * (_this.config.speed / 10));
      _this.dy = 0;
    } else if (_this.config.direction.random) {
      _this.dx = Math.random() >= 0.5 ? -(Math.random() * (_this.config.speed / 10)) : Math.random() * (_this.config.speed / 10);
      _this.dy = Math.random() >= 0.5 ? -(Math.random() * (_this.config.speed / 10)) : Math.random() * (_this.config.speed / 10);
    }

    _this.posX = posX;
    _this.posY = posY;

    _this.radius = _this.config.lineLength;

    _this.color = (0, _color2.default)();
    return _this;
  }

  _createClass(Circle, [{
    key: 'drawCircle',
    value: function drawCircle() {
      this.ctx.beginPath();
      this.ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.dx + this.posX > this.canvas.width - this.size || this.dx + this.posX < this.size) {
        this.dx = -this.dx;
      }

      if (this.dy + this.posY > this.canvas.height - this.size || this.dy + this.posY < this.size) {
        this.dy = -this.dy;
      }

      this.posX += this.dx;
      this.posY += this.dy;

      this.drawCircle();
    }
  }]);

  return Circle;
}(_base2.default);

exports.default = Circle;
},{"../base":6,"./color":16}],4:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _lines = require('./modules/lines');

var _lines2 = _interopRequireDefault(_lines);

var _circle = require('./modules/circle');

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Run = function (_Base) {
  _inherits(Run, _Base);

  function Run() {
    _classCallCheck(this, Run);

    var _this = _possibleConstructorReturn(this, (Run.__proto__ || Object.getPrototypeOf(Run)).call(this));

    _this.circles = [];
    return _this;
  }

  _createClass(Run, [{
    key: 'clearCanvas',
    value: function clearCanvas() {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      if (this.config.click) {
        document.addEventListener('click', function (event) {
          for (var i = 0; i < 3; i++) {
            var randomSize = Math.random() * (_this2.config.dotSize * 0.9);
            var circle = new _circle2.default(randomSize, event.clientX, event.clientY);

            _this2.circles.push(circle);
          }
        });
      } else if (this.config.mouseMove) {
        document.addEventListener('mousemove', function (event) {
          for (var i = 0; i < 1; i++) {
            var randomSize = Math.random() * (_this2.config.dotSize * 0.9);
            var circle = new _circle2.default(randomSize, event.clientX, event.clientY);

            _this2.circles.push(circle);
          }
        });
      } else {
        for (var i = 0; i < this.config.particles; i++) {
          var randomX = Math.floor(Math.random() * this.canvas.width);
          var randomY = Math.floor(Math.random() * this.canvas.height);
          var randomSize = Math.random() * (this.config.dotSize * 0.9);

          var circle = new _circle2.default(randomSize, randomX, randomY);

          this.circles.push(circle);
        }
      }

      var lines = new _lines2.default();

      var draw = function draw(e) {
        _this2.clearCanvas();

        _this2.circles.forEach(function (circle, index) {
          circle.move();
        });

        lines.move(_this2.circles);

        window.requestAnimationFrame(draw);
      };

      draw();
    }
  }]);

  return Run;
}(_base2.default);

var runner = new Run();
runner.init();
},{"./base":6,"./modules/lines":8,"./modules/circle":9}],18:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50810' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[18,4], null)
//# sourceMappingURL=/main.c3561738.map