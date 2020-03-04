import {
  reduceFractionToACommonDenominator,
  reduceFraction,
  getGCD,
  adjustNegative,
  getLCM,
  getDecimalsCount,
} from './utils';

function FractionCalculator(numStr) {
  return new FractionCalculator.fn.init(numStr);
}

FractionCalculator.fn = FractionCalculator.prototype = {};

FractionCalculator.fn.init = function(numStr) {
  this.fraction = FractionCalculator.getFraction(numStr);
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

const _getFraction = function(numStr) {
  if (typeof numStr === 'number') {
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

FractionCalculator.fn.toNumber = function(n) {
  const {
    fraction: { numerator, denominator },
  } = this;

  return numerator / denominator;
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

    this.fraction = result;
    this.fraction = adjustNegative(this.fraction);

    return this;
  } else {
    throw new Error('Pow reached Infinity/Infinity');
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

  return Math.ceil(numerator / denominator);
};

FractionCalculator.fn.floor = function() {
  const {
    fraction: { numerator, denominator },
  } = this;

  return Math.floor(numerator / denominator);
};

FractionCalculator.fn.round = function() {
  const {
    fraction: { numerator, denominator },
  } = this;

  return Math.round(numerator / denominator);
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
