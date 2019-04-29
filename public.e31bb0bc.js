// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/conversions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRoman = exports.toArabic = void 0;
var toArabic = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};
exports.toArabic = toArabic;
var toRoman = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M'
};
exports.toRoman = toRoman;
},{}],"../src/arabicToRoman.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupInDecimals = groupInDecimals;
exports.convertToRoman = convertToRoman;
exports.default = void 0;

var _conversions = require("./conversions");

var decimals = [1000, 100, 10, 1];

function arabicToRoman() {
  var numeral = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  // if (Number.isNaN(Number(numeral)) || numeral < 0 || numeral > 3999) {
  if (isNaN(numeral) || numeral < 0) {
    throw new Error("".concat(numeral, " is not a valid arabic numeral"));
  }

  var group = groupInDecimals(numeral);
  return decimals.reduce(function (acc, val) {
    if (group[val]) return acc + convertToRoman(val, group[val]);
    return acc;
  }, '');
}

function groupInDecimals() {
  var numeral = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return decimals.reduce(function (acc, val) {
    if (numeral >= val) {
      acc[val] = Math.floor(numeral / val);
      numeral -= val * acc[val];
    }

    return acc;
  }, {});
}

function convertToRoman(decimalValue, valueCount) {
  var decimalRomanNumeral = _conversions.toRoman[decimalValue];
  var fiveTimesDecimalRomanNumeral = _conversions.toRoman[decimalValue * 5];
  var tenTimesDecimalRomanNumeral = _conversions.toRoman[decimalValue * 10];

  switch (valueCount) {
    case 1:
    case 2:
    case 3:
      {
        return decimalRomanNumeral.repeat(valueCount);
      }

    case 4:
      {
        return decimalRomanNumeral + fiveTimesDecimalRomanNumeral;
      }

    case 5:
    case 6:
    case 7:
    case 8:
      {
        return fiveTimesDecimalRomanNumeral + decimalRomanNumeral.repeat(valueCount - 5);
      }

    case 9:
      {
        return decimalRomanNumeral + tenTimesDecimalRomanNumeral;
      }
  }
}

var _default = arabicToRoman;
exports.default = _default;
},{"./conversions":"../src/conversions.js"}],"../src/romanToArabic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitIntoGroups = splitIntoGroups;
exports.sumCharGroup = sumCharGroup;
exports.default = void 0;

var _conversions = require("./conversions");

function romanToArabic() {
  var numeral = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var validGroups;

  try {
    validGroups = splitIntoGroups(numeral.toUpperCase());
  } catch (error) {
    console.error(error);
    throw new Error("".concat(numeral, " is an invalid roman numeral"));
  }

  return validGroups.reduce(function (acc, val) {
    return acc + sumCharGroup(val);
  }, 0);
}
/**
 * Returns an array of logical groups from a roman numeral
 * @param {String} numeral - An uppercase roman numeral
 */


function splitIntoGroups() {
  var numeral = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var group = '';
  var nextChar;
  return numeral.split('').reduce(function (groups, char, i) {
    group += char;

    if (!_conversions.toArabic[char]) {
      throw new Error("".concat(char, " is not a valid roman numeral character"));
    }

    nextChar = numeral[i + 1];

    if (!nextChar || _conversions.toArabic[nextChar] < _conversions.toArabic[char]) {
      groups.push(group);
      group = '';
    }

    return groups;
  }, []);
}
/**
 * Returns the sum of a group of roman numeral characters
 * @param {String} group - A grouping of roman numeral characters
 */


function sumCharGroup() {
  var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var digit;
  var prevDigit;
  return group.split('').reduce(function (acc, char, i) {
    digit = _conversions.toArabic[char];
    prevDigit = _conversions.toArabic[group[i - 1]];

    if (!prevDigit || prevDigit >= digit) {
      return acc + digit;
    }

    return digit - acc;
  }, 0);
}

var _default = romanToArabic;
exports.default = _default;
},{"./conversions":"../src/conversions.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _arabicToRoman = _interopRequireDefault(require("../src/arabicToRoman"));

var _romanToArabic = _interopRequireDefault(require("../src/romanToArabic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arabicInputId = 'arabicInput';
var romanInputId = 'romanInput';

var getArabicInput = function getArabicInput() {
  return document.getElementById(arabicInputId);
};

var getRomanInput = function getRomanInput() {
  return document.getElementById(romanInputId);
};

function handleConversion(_ref) {
  var target = _ref.target;
  if (target.value.length === 0) return clearInputs();

  try {
    if (target.id === romanInputId) {
      var uppercaseValue = target.value.toUpperCase();
      getRomanInput().value = uppercaseValue;
      getArabicInput().value = (0, _romanToArabic.default)(uppercaseValue);
    } else {
      getRomanInput().value = (0, _arabicToRoman.default)(target.value);
    }
  } catch (error) {
    console.error(error);
    document.querySelector('.error').textContent = error;
  }
}

function handleKeyUp(_ref2) {
  var key = _ref2.key;

  if (key === 'Escape') {
    clearInputs();
  }
}

function clearInputs() {
  getRomanInput().value = '';
  getArabicInput().value = '';
  document.querySelector('.error').textContent = '';
}

function domReady(fn) {
  // DOM isn't ready yet
  document.addEventListener('DOMContentLoaded', fn); // DOM is ready, fire callback

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn();
  }
}

function init() {
  var clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', clearInputs);
  document.addEventListener('keyup', handleKeyUp);
  getRomanInput().addEventListener('keyup', handleConversion);
  getArabicInput().addEventListener('keyup', handleConversion);
}

domReady(init);
},{"../src/arabicToRoman":"../src/arabicToRoman.js","../src/romanToArabic":"../src/romanToArabic.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53689" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
        parents.push(k);
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/public.e31bb0bc.js.map