export function getGCD(a, b) {
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

export function getLCM(a, b) {
  // get lowest common multiple(LCM)
  // LCM(a, b) = (a / GCD(a, b)) * (b / GCD(a, b)) * GCD(a, b)
  //           = a * b / GCD(a, b)

  return (a * b) / getGCD(a, b);
}

export function getAbsoluteValue(num) {
  return num < 0 ? -num : num;
}

export function adjustNegative(fraction) {
  const { numerator, denominator } = fraction;

  if (numerator < 0 && denominator < 0) {
    return {
      numerator: getAbsoluteValue(numerator),
      denominator: getAbsoluteValue(denominator),
    };
  } else if (numerator < 0 || denominator < 0) {
    return {
      numerator: -getAbsoluteValue(numerator),
      denominator: getAbsoluteValue(denominator),
    };
  }

  return fraction;
}

export function reduceFraction(fractionObj) {
  const { numerator, denominator } = fractionObj;
  const gcd = getGCD(numerator, denominator);

  let fraction = {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  };

  fraction = adjustNegative(fraction);

  return fraction;
}

export function reduceFractionToACommonDenominator(fractionA, fractionB) {
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

export function getDecimalsCount(num) {
  const numStr = `${num}`;

  const count = numStr.length - numStr.indexOf('.') - 1;

  return count;
}

export function getFractionFromNumber(num) {
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

export function getFractionFromString(str) {
  const strArr = String(str)
    .trim()
    .split('/');
  const length = strArr.length;

  if (!length) {
    throw new Error("Empty string isn't supported");
  }

  if (length === 1) {
    return getFractionFromNumber(strArr[0]);
  } else if (!Number(strArr[1])) {
    throw new Error("Denominator can't be 0 or NaN");
  } else {
    let fraction = {
      numerator: Number(strArr[0]),
      denominator: Number(strArr[1]),
    };

    fraction = reduceFraction(fraction);

    return fraction;
  }
}
