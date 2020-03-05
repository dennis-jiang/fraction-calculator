import {
  reduceFractionToACommonDenominator,
  reduceFraction,
  getGCD,
  adjustNegative,
  getLCM,
  getDecimalsCount,
  getDecimalsFromFraction,
} from './utils';

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
  const cyclePart = parts[3];
  const cycleLength = cyclePart.length;
  const decimalsPart = `${nonCyclePart}${cyclePart}`;
  const decimalsLength = decimalsPart.length;

  const firstDemon = Number(`1e${decimalsLength}`);
  let firstFraction = `${decimalsPart}/${firstDemon}`;

  let secondDemon = '';
  for (let i = 0; i < cycleLength; i++) {
    secondDemon = secondDemon + '9';
  }
  secondDemon = Number(secondDemon) * Number(`1e${decimalsLength}`);
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

export default FractionCalculator;
