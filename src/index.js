import {
  getFractionFromNumber,
  getFractionFromString,
  reduceFractionToACommonDenominator,
  reduceFraction,
  getGCD,
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

FractionCalculator.fn.toString = function(withWholePart = false) {
  const {
    fraction: { numerator, denominator },
  } = this;

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

// instance methods
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

  this.fraction = reduceFraction(result);
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

  this.fraction = reduceFraction(result);
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
    } else if (n === 0) {
      result = {
        numerator: 1,
        denominator: 1,
      };
    } else {
      result = {
        numerator: numeratorPow,
        denominator: denominatorPow,
      };
    }

    this.fraction = reduceFraction(result);
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

  this.fraction = result;

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
  let result = this.minus(b).toNumber();

  return result === 0;
};

FractionCalculator.fn.greaterThan = function(b) {
  let result = this.minus(b).toNumber();

  return result > 0;
};

FractionCalculator.fn.lessThan = function(b) {
  let result = this.minus(b).toNumber();

  return result < 0;
};

FractionCalculator.fn.mod = function(b) {
  const quotient = this.clone().div(b);
  const {
    fraction: { numerator, denominator },
  } = quotient;
  const floorQuotient = Math.floor(numerator / denominator);
  const result = this.minus(floorQuotient);

  return result;
};

export default FractionCalculator;
