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

// The vertical spacing between symbols within a group.
var symbolSpacing = 100;
// The horizontal spacing used between related paths and larger path branches.
var groupSpacing = {
  COMPONENT: 800,
  RELATED: 200,
  SECTION: 400
};

// A reference to our page containing our symbols.
var symbolsPage;
function organizeSymbols() {
  var document = sketch.getSelectedDocument();

  // There doesn't seem to be a sure-fire way of finding the symbols page if
  // it has been renamed, other than checking things like whether a page has
  // only symbols, or the most symbols, neither of which seems like a
  // guarantee. For now, we'll just look for a "Symbols" page.
  symbolsPage = document.pages.find(function (page) {
    return page.name === "Symbols";
  });
  if (!symbolsPage) {
    sketch.UI.message("No page named \"Symbols\" found. For now, the plugin requires a page with the default name.");
    return;
  }
  var symbols = symbolsPage.layers.filter(function (layer) {
    return layer.type === "SymbolMaster";
  });
  if (!Array.isArray(symbols) || !symbols.length) {
    sketch.UI.message("It doesn't look like there were any symbols to organise.");
    return;
  }

  // Start by sorting our layer list to keep both the layer list and canvas
  // predictable.
  sortLayerList(symbols);
  var groups = determineSymbolGroups();
  positionSymbolGroups(groups);
  sketch.UI.message("Symbols organised successfully.");
}

/**
 * Sort the symbols in the layer list based on their names.
 *
 * @param  {array}  layers
 *     The layers to sort.
 */
function sortLayerList(layers) {
  // Assign sorted indices explicitly so the layer list stays predictable.
  var sortedLayers = layers.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  // Re-order our layer list to match the sort.
  sortedLayers.forEach(function (layer, index) {
    return layer.index = index;
  });
}

/**
 * Group all symbols by their path, keeping sibling symbols together.
 */
function determineSymbolGroups() {
  // We retrieve our symbols again because they've just been sorted.
  var symbols = symbolsPage.layers.filter(function (layer) {
    return layer.type === "SymbolMaster";
  });
  var groups = [];
  symbols.forEach(function (symbol) {
    var symbolNameParts = symbol.name.split("/");
    var symbolPath = symbolNameParts.slice(0, -1).join("/");

    // See if we can find an existing group for this symbol with the same
    // path.
    var group = groups.find(function (group) {
      return group.path === symbolPath;
    });
    if (!group) {
      group = {
        path: symbolPath,
        symbols: []
      };
      groups.push(group);
    }
    group.symbols.push({
      name: symbol.name,
      frame: symbol.frame
    });
  });
  return groups.sort(function (a, b) {
    return a.path.localeCompare(b.path);
  });
}

/**
 * Chooses spacing that reflects how closely two symbol paths are related.
 *
 * @param  {string}  currentPath
 *   The path of the group that has just been positioned.
 * @param  {string}  nextPath
 *   The path of the next group to position.
 * @returns {number} The horizontal spacing between the groups.
 */
function getGroupSpacing(currentPath, nextPath) {
  var currentParts = currentPath.split("/");
  var nextParts = nextPath.split("/");
  var comparisonLength = Math.min(currentParts.length, nextParts.length);
  var sharedDepth = 0;
  for (var index = 0; index < comparisonLength; index += 1) {
    if (currentParts[index] !== nextParts[index]) {
      break;
    }
    sharedDepth += 1;
  }
  if (sharedDepth === 0) {
    return groupSpacing.COMPONENT;
  }
  if (sharedDepth === 1) {
    return groupSpacing.SECTION;
  }
  return groupSpacing.RELATED;
}

/**
 * Position our symbol groups, placing each new group in a new column.
 *
 * @param  {array}  groups
 *     The collection of symbol groups to place.
 */
function positionSymbolGroups(groups) {
  var x = 0;
  groups.forEach(function (group, groupIndex) {
    if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(group) !== "object" || !Object.hasOwn(group, "symbols")) {
      return;
    }

    // Keep track of our widest symbol to properly align the next group.
    var maxWidthForThisGroup = 0;
    // When placing symbols within a group, we organise them vertically,
    // starting at y position 0.
    var currentYPosition = 0;
    group.symbols.forEach(function (symbol) {
      // Position our symbol at our current horizontal x position.
      symbol.frame.x = x;
      // Position our symbol at our calculated y position, taking into
      // account other symbols in this group.
      symbol.frame.y = currentYPosition;
      currentYPosition += symbol.frame.height + symbolSpacing;

      // Track the widest symbol at this level, which allows us to
      // properly place the next level.
      if (symbol.frame.width > maxWidthForThisGroup) {
        maxWidthForThisGroup = symbol.frame.width;
      }
    });

    // Once we're finished with the group, we can update the x position
    // ready for the next.
    var nextGroup = groups[groupIndex + 1];
    if (maxWidthForThisGroup > 0 && nextGroup) {
      x += maxWidthForThisGroup + getGroupSpacing(group.path, nextGroup.path);
    }
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