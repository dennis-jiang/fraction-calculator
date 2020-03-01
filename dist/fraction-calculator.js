(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['fc'] = factory();
  else root['fc'] = factory();
})(window, function() {
  return /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports;
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }); // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__,
      ); // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true; // Return the exports of the module
      /******/
      /******/ /******/ return module.exports;
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        });
        /******/
      }
      /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
      value,
      mode,
    ) {
      /******/ if (mode & 1) value = __webpack_require__(value);
      /******/ if (mode & 8) return value;
      /******/ if (
        mode & 4 &&
        typeof value === 'object' &&
        value &&
        value.__esModule
      )
        return value;
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value,
      });
      /******/ if (mode & 2 && typeof value != 'string')
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function(key) {
              return value[key];
            }.bind(null, key),
          );
      /******/ return ns;
      /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default'];
            }
          : /******/ function getModuleExports() {
              return module;
            };
      /******/ __webpack_require__.d(getter, 'a', getter);
      /******/ return getter;
      /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);

        // CONCATENATED MODULE: ./src/utils.js
        function getGCD(a, b) {
          // get greatest common divisor(GCD)
          // GCD(a, b) = GCD(b, a % b)
          let mod = a % b;

          while (mod !== 0) {
            a = b;
            b = mod;
            mod = a % b;
          }

          return b;
        }

        function getLCM(a, b) {
          // get lowest common multiple(LCM)
          // LCM(a, b) = (a / GCD(a, b)) * (b / GCD(a, b)) * GCD(a, b)
          //           = a * b / GCD(a, b)

          return (a * b) / getGCD(a, b);
        }

        function reduceFraction(fractionObj) {
          const { numerator, denominator } = fractionObj;
          const gcd = getGCD(numerator, denominator);

          return {
            numerator: numerator / gcd,
            denominator: denominator / gcd,
          };
        }

        function getDecimalsCount(num) {
          const numStr = `${num}`;

          const count = numStr.length - numStr.indexOf('.') - 1;

          return count;
        }

        function getFractionFromNumber(num) {
          let number = Number(num);

          if (!Number.isFinite(number)) {
            throw new Error('Unsupported number NaN or Infinity');
          }

          if (Number.isInteger(number)) {
            return {
              numerator: number,
              denominator: 1,
            };
          } else {
            const decimalsCount = getDecimalsCount(num);
            let fraction = {
              numerator: num * Number(`1e${decimalsCount}`),
              denominator: Number(`1e${decimalsCount}`),
            };

            fraction = reduceFraction(fraction);

            return fraction;
          }
        }

        function getFractionFromString(str) {
          const strArr = String(str)
            .trim()
            .split('/');
          const length = strArr.length;

          if (!length) {
            throw new Error("Empty string isn't supported");
          }

          if (length === 1) {
            return getFractionFromNumber(strArr[0]);
          } else {
            let fraction = {
              numerator: Number(strArr[0]),
              denominator: Number(strArr[1]),
            };

            fraction = reduceFraction(fraction);

            return fraction;
          }
        }

        // CONCATENATED MODULE: ./src/index.js

        function FractionCalculator(numStr) {
          return new FractionCalculator.fn.init(numStr);
        }

        FractionCalculator.fn = FractionCalculator.prototype = {};

        FractionCalculator.fn.init = function(numStr) {
          this.fraction = FractionCalculator.getFraction(numStr);
        };
        FractionCalculator.fn.init.prototype = FractionCalculator.fn;

        // internal methods
        const _getFraction = function(numStr) {
          if (typeof numStr === 'number') {
            return getFractionFromNumber(numStr);
          } else if (typeof numStr === 'string') {
            return getFractionFromString(numStr);
          } else if (numStr instanceof FractionCalculator) {
            return numStr.fraction;
          }

          throw new Error(`Unsupported parameter ${numStr}`);
        };

        // static methods
        FractionCalculator.getFraction = _getFraction;

        // instance methods
        FractionCalculator.fn.plus = function(b) {
          const fractionA = this.fraction;
          const fractionB = _getFraction(b);
        };

        /* harmony default export */ var src = (__webpack_exports__[
          'default'
        ] = FractionCalculator);

        /***/
      },
      /******/
    ],
  );
});
