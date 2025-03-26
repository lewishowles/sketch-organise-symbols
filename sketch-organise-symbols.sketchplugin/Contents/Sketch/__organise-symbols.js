var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/organise-symbols.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./src/organise-symbols.js":
/*!*********************************!*\
  !*** ./src/organise-symbols.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return organizeSymbols; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Organise symbols based on their names, particularly groups defined in those
 * names, as defined by the use of the forward-slash ("/").
 */

var sketch = __webpack_require__(/*! sketch */ "sketch");

// The spacing between symbols within a group.
var symbolSpacing = 100;
// The multiple of symbolSpacing to use between groups.
var groupSpacing = 200;
function organizeSymbols() {
  var document = sketch.getSelectedDocument();

  // There doesn't seem to be a sure-fire way of finding the symbols page if
  // it has been renamed, other than checking things like whether a page has
  // only symbols, or the most symbols, neither of which seems like a
  // guarantee. For now, we'll just look for a "Symbols" page.
  var symbolsPage = document.pages.find(function (page) {
    return page.name === "Symbols";
  });
  if (!symbolsPage) {
    sketch.UI.message("No page named \"Symbols\" found!");
    return;
  }
  var symbols = symbolsPage.layers.filter(function (layer) {
    return layer.type === "SymbolMaster";
  });
  if (!Array.isArray(symbols) || !symbols.length) {
    sketch.UI.message("No symbols could be found to organise.");
    return;
  }

  // Sort the layer list alphabetically before we begin.
  sortLayerList(symbols);
  var hierarchy = determineSymbolHierarchy(symbols);

  // Start positioning our symbols from the top-left corner.
  positionSymbols(hierarchy, 0, 0);
  sketch.UI.message("Symbols organised successfully!");
}

/**
 * Determine our symbol hierarchy, based on each new depth within the name being
 * a horizontal column. The resulting hierarchy can be used to procedurally
 * place symbols on a page.
 *
 * @param  {array}  symbolList
 *     The list of symbols to arrange into a hierarchy.
 */
function determineSymbolHierarchy(symbolList) {
  var hierarchy = {};
  symbolList.forEach(function (symbol) {
    var nameParts = symbol.name.split("/");
    var currentLevel = hierarchy;
    nameParts.forEach(function (part, index) {
      // If this is the last part, we add the symbol to the parent level's
      // array.
      if (index === nameParts.length - 1) {
        if (!currentLevel._symbols) {
          currentLevel._symbols = [];
        }
        currentLevel._symbols.unshift(symbol);
      } else if (!currentLevel[part]) {
        currentLevel[part] = {};
      }
      currentLevel = currentLevel[part];
    });
  });
  return hierarchy;
}

/**
 * Position the given symbols of a group, based on a starting position. Each
 * group represents a particular depth, and each item in a group is placed
 * horizontally, with each new depth within that group placed vertically. Both
 * the next group, and the next depth, are offset by the maximum width or height
 * of a symbol that we encounter.
 *
 * @param  {object}  group
 *     The collection of symbols to arrange
 * @param  {number}  startX
 *     The starting X position for the current group
 */
function positionSymbols(group) {
  var startX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(group) !== "object") {
    return {
      x: startX,
      maxHeight: 0
    };
  }
  var x = startX;
  var maxWidthForThisGroup = 0;
  Object.keys(group).sort().forEach(function (subGroupName) {
    var subGroup = group[subGroupName];
    var isSymbolArray = Array.isArray(subGroup);
    if (isSymbolArray) {
      var symbolY = 0;

      // When encountering symbols within a group, we place them
      // horizontally.
      subGroup.forEach(function (symbol) {
        symbol.frame.x = x;
        symbol.frame.y = symbolY;
        symbolY += symbol.frame.height + symbolSpacing;

        // Track the tallest symbol at this level, which allows us to
        // properly place the next level.
        if (symbol.frame.width > maxWidthForThisGroup) {
          maxWidthForThisGroup = symbol.frame.width;
        }
      });
    } else {
      var newX = maxWidthForThisGroup > 0 ? x + maxWidthForThisGroup + groupSpacing : x;
      var nextLevelResult = positionSymbols(subGroup, newX);

      // Update the x position for subsequent groups.
      x = nextLevelResult.x;

      // Update the max width for this level.
      if (nextLevelResult.maxWidth > maxWidthForThisGroup) {
        maxWidthForThisGroup = nextLevelResult.maxWidth;
      }
    }
  });

  // Return the updated starting positions.
  return {
    x: x,
    maxWidth: maxWidthForThisGroup
  };
}

/**
 * Sort the symbols in the layer list based on their names.
 *
 * @param  {array}  layers
 *     The layers to sort.
 */
function sortLayerList(layers) {
  // Sort layers alphabetically by name
  var sortedLayers = layers.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  // Reorder layers in the layer list. The layer list has high indexes at the
  // top, so we reverse our sorted layers.
  sortedLayers.reverse().forEach(function (layer, index) {
    layer.index = index;
  });
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__organise-symbols.js.map