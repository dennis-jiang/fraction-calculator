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

export function reduceFraction(fractionObj) {
  const { numerator, denominator } = fractionObj;

  if (Number.isFinite(numerator) && Number.isFinite(denominator)) {
    const gcd = getGCD(numerator, denominator);

    let fraction = {
      numerator: numerator / gcd,
      denominator: denominator / gcd,
    };

    return fraction;
  }

  return fractionObj;
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
