export function getDecimalsCount(num) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const numStr = `${num}`;

  const count = numStr.length - numStr.indexOf('.') - 1;

  return count;
}

export function getGCD(a, b) {
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

export function getLCM(a, b) {
  // get lowest common multiple(LCM)
  // LCM(a, b) = (a / GCD(a, b)) * (b / GCD(a, b)) * GCD(a, b)
  //           = a * b / GCD(a, b)

  return (a * b) / getGCD(a, b);
}

export function adjustNegative(fraction) {
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

export function convertDecimalToInteger(num) {
  return Number(`${num}`.replace('.', ''));
}

export function adjustToInteger(fractionObj) {
  let { numerator, denominator } = fractionObj;
  if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
    return {
      numerator,
      denominator,
    };
  }

  const decimalsA = getDecimalsCount(numerator);
  const decimalsB = getDecimalsCount(denominator);
  const diffCount = decimalsA - decimalsB;
  numerator = convertDecimalToInteger(numerator);
  denominator = convertDecimalToInteger(denominator);

  if (diffCount > 0) {
    denominator = denominator * Number(`1e${diffCount}`);
  } else if (diffCount < 0) {
    numerator = numerator * Number(`1e${-diffCount}`);
  }

  return {
    numerator,
    denominator,
  };
}

export function reduceFraction(fractionObj) {
  let fraction = adjustToInteger(fractionObj);

  const { numerator, denominator } = fraction;
  const gcd = getGCD(numerator, denominator);

  let fractionRes = {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  };

  return fractionRes;
}

export function reduceFractionToACommonDenominator(fractionA, fractionB) {
  fractionA = adjustToInteger(fractionA);
  fractionB = adjustToInteger(fractionB);
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

export function getDecimalsFromFraction(numerator, denominator) {
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
