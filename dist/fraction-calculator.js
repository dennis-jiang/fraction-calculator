(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fc"] = factory();
	else
		root["fc"] = factory();
})(typeof window !== "undefined" ? window : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/utils.js
function getGCD(a, b) {
  // get greatest common divisor(GCD)
  // GCD(a, b) = GCD(b, a % b)
  a = Math.abs(a);
  b = Math.abs(b);
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

function adjustNegative(fraction) {
  const { numerator, denominator } = fraction;

  if (numerator < 0 && denominator < 0) {
    return {
      numerator: Math.abs(numerator),
      denominator: Math.abs(denominator),
    };
  } else if (numerator < 0 || denominator < 0) {
    return {
      numerator: -Math.abs(numerator),
      denominator: Math.abs(denominator),
    };
  }

  return fraction;
}

function reduceFraction(fractionObj) {
  const { numerator, denominator } = fractionObj;

  const gcd = getGCD(numerator, denominator);

  let fraction = {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  };

  return fraction;
}

function reduceFractionToACommonDenominator(fractionA, fractionB) {
  const denominatorA = fractionA.denominator;
  const denominatorB = fractionB.denominator;
  const lcm = getLCM(denominatorA, denominatorB);
  const zoomA = lcm / denominatorA;
  const zoomB = lcm / denominatorB;

  const numeratorA = zoomA * fractionA.numerator;
  const numeratorB = zoomB * fractionB.numerator;

  return {
    fractionA: {
      numerator: numeratorA,
      denominator: lcm,
    },
    fractionB: {
      numerator: numeratorB,
      denominator: lcm,
    },
  };
}

function getDecimalsCount(num) {
  const numStr = `${num}`;

  const count = numStr.length - numStr.indexOf('.') - 1;

  return count;
}

function getDecimalsFromFraction(numerator, denominator) {
  // make sure numerator is less than denominator
  const modObj = {};
  const quotientArray = [];

  let mod;
  let index = 0;

  while (true) {
    mod = numerator % denominator;

    if (mod === 0) {
      return quotientArray.join('');
    }

    let existIndex = modObj[mod];
    if (existIndex >= 0) {
      let quotientLength = quotientArray.length;
      quotientArray.splice(existIndex, 0, '(');
      quotientArray.splice(quotientLength + 1, 0, ')');

      return quotientArray.join('');
    }

    modObj[mod] = index;
    index++;
    numerator = mod * 10;

    let quotient = parseInt(numerator / denominator);
    quotientArray.push(quotient);

    if (index >= 3000) {
      // Recurring part can be very long, we only handle first 3000 numbers
      return quotientArray.join('');
    }
  }
}

// CONCATENATED MODULE: ./src/index.js


function FractionCalculator(numStr, denominator) {
  return new FractionCalculator.fn.init(numStr, denominator);
}

FractionCalculator.fn = FractionCalculator.prototype = {};

FractionCalculator.fn.init = function(numStr, denominator) {
  this.fraction = FractionCalculator.getFraction(numStr, denominator);
};
FractionCalculator.fn.init.prototype = FractionCalculator.fn;

// internal methods

function _getFractionFromNumber(num) {
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

    return fraction;
  }
}

function _getFractionFromCycleNumber(str, reg, isPositive) {
  const parts = str.match(reg);
  let intPart = parts[1] || '0';
  const nonCyclePart = parts[2];
  const nonCycleLength = nonCyclePart.length;
  const cyclePart = parts[3];
  const cycleLength = cyclePart.length;
  const decimalsPart = `${nonCyclePart}${cyclePart}`;

  const firstDemon = Number(`1e${nonCycleLength}`);
  let firstFraction = `${nonCyclePart}/${firstDemon}`;

  let secondDemon = '';
  for (let i = 0; i < cycleLength; i++) {
    secondDemon = secondDemon + '9';
  }
  secondDemon = Number(secondDemon) * Number(`1e${nonCycleLength}`);
  const secondFraction = `${cyclePart}/${secondDemon}`;

  const final = FractionCalculator(firstFraction)
    .plus(secondFraction)
    .plus(Number(intPart));

  const {
    fraction: { numerator, denominator },
  } = final;

  const fraction = {
    numerator: isPositive ? numerator : -numerator,
    denominator,
  };

  return fraction;
}

function _getFractionFromString(str) {
  let string = String(str).trim();
  let isPositive = true;
  const firstChar = string[0];
  if (firstChar === '-') {
    isPositive = false;
    string = string.slice(1);
  } else if (firstChar === '+') {
    string = string.slice(1);
  }

  // support cycle number, "12.2'345'", "12.2(345)"
  const reg1 = /^(\d*).(\d*)'(\d+)'$/;
  const reg2 = /^(\d*).(\d*)\((\d+)\)$/;
  if (reg1.test(string)) {
    return _getFractionFromCycleNumber(string, reg1, isPositive);
  } else if (reg2.test(string)) {
    return _getFractionFromCycleNumber(string, reg2, isPositive);
  }

  let wholePart = 0;
  let strArr;
  if (string.includes(' ')) {
    strArr = string.split(' ');
    wholePart = Number(strArr[0]);
    string = strArr[1];
  }

  strArr = string.split('/');
  let length = strArr.length;

  if (wholePart) {
    const numeratorNum = Number(strArr[0]) + wholePart * Number(strArr[1]);
    const numerator = Number(`${isPositive ? '' : '-'}${numeratorNum}`);
    let fraction = {
      numerator: numerator,
      denominator: Number(strArr[1]),
    };

    fraction = adjustNegative(fraction);

    return fraction;
  } else {
    const numerator = Number(`${isPositive ? '' : '-'}${strArr[0]}`);

    if (length === 1) {
      return _getFractionFromNumber(numerator);
    } else if (!Number(strArr[1])) {
      throw new Error("Denominator can't be 0 or NaN");
    } else {
      let fraction = {
        numerator: numerator,
        denominator: Number(strArr[1]),
      };

      fraction = adjustNegative(fraction);

      return fraction;
    }
  }
}

const _getFraction = function(numStr, denominator) {
  if (
    typeof numStr === 'number' &&
    typeof denominator === 'number' &&
    denominator !== 0
  ) {
    let fraction = {
      numerator: numStr,
      denominator: denominator,
    };

    fraction = adjustNegative(fraction);

    return fraction;
  } else if (typeof numStr === 'number') {
    return _getFractionFromNumber(numStr);
  } else if (typeof numStr === 'string') {
    return _getFractionFromString(numStr);
  } else if (numStr instanceof FractionCalculator) {
    return numStr.fraction;
  }

  throw new Error(`Unsupported parameter ${numStr}`);
};

// Global config
FractionCalculator.DISABLE_REDUCE = false;

// static methods
FractionCalculator.getFraction = _getFraction;
FractionCalculator.gcd = function(a, b) {
  if (Number.isFinite(a) && Number.isFinite(b)) {
    return getGCD(a, b);
  }

  throw new Error('Invalid Parameter');
};

FractionCalculator.lcm = function(a, b) {
  if (Number.isFinite(a) && Number.isFinite(b)) {
    return getLCM(a, b);
  }

  throw new Error('Invalid Parameter');
};

// instance methods
FractionCalculator.fn.toString = function(withWholePart = false) {
  let fraction = this.fraction;

  if (!FractionCalculator.DISABLE_REDUCE) {
    fraction = reduceFraction(fraction);
  }

  const { numerator, denominator } = fraction;

  if (numerator === 0) {
    return '0';
  }

  if (denominator === 1) {
    return `${numerator}`;
  }

  if (withWholePart) {
    const wholePart = parseInt(numerator / denominator);
    const mod = Math.abs(numerator % denominator);

    if (wholePart !== 0) {
      return `${wholePart} ${mod}/${denominator}`;
    }
  }

  return `${numerator}/${denominator}`;
};

FractionCalculator.fn.toFixed = function(n) {
  const {
    fraction: { numerator, denominator },
  } = this;

  return (numerator / denominator).toFixed(n);
};

FractionCalculator.fn.toNumber = function() {
  const {
    fraction: { numerator, denominator },
  } = this;

  return numerator / denominator;
};

FractionCalculator.fn.toRecurringDecimal = function() {
  let { fraction } = this;

  fraction = reduceFraction(fraction);

  let { numerator, denominator } = fraction;
  let isPositive = true;
  if (numerator < 0) {
    isPositive = false;
    numerator = -numerator;
  }

  const originInt = parseInt(numerator / denominator);
  numerator = numerator - originInt * denominator;

  const sign = isPositive ? '' : '-';
  if (numerator === 0) {
    return `${sign}${originInt}`;
  }

  const decimalsPart = getDecimalsFromFraction(numerator, denominator);

  return `${sign}${originInt}.${decimalsPart}`;
};

FractionCalculator.fn.plus = function(b) {
  const fractionA = this.fraction;
  const fractionB = _getFraction(b);
  const commonFraction = reduceFractionToACommonDenominator(
    fractionA,
    fractionB,
  );

  const commonFractionA = commonFraction.fractionA;
  const commonFractionB = commonFraction.fractionB;

  const result = {
    numerator: commonFractionA.numerator + commonFractionB.numerator,
    denominator: commonFractionA.denominator,
  };

  this.fraction = result;

  return this;
};

FractionCalculator.fn.minus = function(b) {
  const fractionB = _getFraction(b);
  fractionB.numerator = -fractionB.numerator;

  return this.plus(`${fractionB.numerator}/${fractionB.denominator}`);
};

FractionCalculator.fn.times = function(b) {
  const fractionA = this.fraction;
  const fractionB = _getFraction(b);

  const result = {
    numerator: fractionA.numerator * fractionB.numerator,
    denominator: fractionA.denominator * fractionB.denominator,
  };

  this.fraction = result;

  this.fraction = adjustNegative(this.fraction);

  return this;
};

FractionCalculator.fn.div = function(b) {
  const fractionB = _getFraction(b);
  const { numerator, denominator } = fractionB;

  return this.times(`${denominator}/${numerator}`);
};

FractionCalculator.fn.pow = function(n) {
  const {
    fraction: { numerator, denominator },
  } = this;

  const numeratorPow = Math.pow(numerator, n);
  const denominatorPow = Math.pow(denominator, n);

  let result;
  if (Number.isFinite(numeratorPow) || Number.isFinite(denominatorPow)) {
    if (n < 0) {
      result = {
        numerator: 1 / denominatorPow,
        denominator: 1 / numeratorPow,
      };
    } else {
      result = {
        numerator: numeratorPow,
        denominator: denominatorPow,
      };
    }

    if (!Number.isFinite(result.denominator)) {
      result = {
        numerator: 0,
        denominator: 1,
      };
    } else if (!Number.isFinite(result.numerator)) {
      throw new Error('Numerator reached Infinity');
    }

    this.fraction = result;
    this.fraction = adjustNegative(this.fraction);

    return this;
  } else {
    throw new Error('Numerator reached Infinity');
  }
};

FractionCalculator.fn.sqrt = function() {
  const {
    fraction: { numerator },
  } = this;

  if (numerator < 0) {
    throw new Error('Sqrt number cannot less than 0');
  }

  return this.pow(1 / 2);
};

FractionCalculator.fn.abs = function() {
  const {
    fraction: { numerator },
  } = this;

  this.fraction.numerator = Math.abs(numerator);

  return this;
};

FractionCalculator.fn.neg = function() {
  const {
    fraction: { numerator },
  } = this;

  this.fraction.numerator = -numerator;

  return this;
};

FractionCalculator.fn.inverse = function() {
  const {
    fraction: { numerator, denominator },
  } = this;

  let result = {
    numerator: denominator,
    denominator: numerator,
  };

  this.fraction = adjustNegative(result);

  return this;
};

FractionCalculator.fn.clone = function() {
  return FractionCalculator(this);
};

FractionCalculator.fn.ceil = function() {
  const {
    fraction: { numerator, denominator },
  } = this;

  this.fraction = {
    numerator: Math.ceil(numerator / denominator),
    denominator: 1,
  };

  return this;
};

FractionCalculator.fn.floor = function() {
  const {
    fraction: { numerator, denominator },
  } = this;

  this.fraction = {
    numerator: Math.floor(numerator / denominator),
    denominator: 1,
  };

  return this;
};

FractionCalculator.fn.round = function() {
  const {
    fraction: { numerator, denominator },
  } = this;

  this.fraction = {
    numerator: Math.round(numerator / denominator),
    denominator: 1,
  };

  return this;
};

FractionCalculator.fn.equals = function(b) {
  let result = this.minus(b);

  return result.fraction.numerator === 0;
};

FractionCalculator.fn.greaterThan = function(b) {
  let result = this.minus(b);

  return result.fraction.numerator > 0;
};

FractionCalculator.fn.lessThan = function(b) {
  let result = this.minus(b);

  return result.fraction.numerator < 0;
};

FractionCalculator.fn.mod = function(b) {
  const quotient = this.clone().div(b);
  const {
    fraction: { numerator, denominator },
  } = quotient;
  const floorQuotient = parseInt(numerator / denominator);
  const result = this.minus(FractionCalculator(b).times(floorQuotient));

  return result;
};

/* harmony default export */ var src = __webpack_exports__["default"] = (FractionCalculator);


/***/ })
/******/ ])["default"];
});