import {
  getGCD,
  getLCM,
  getDecimalsCount,
  adjustNegative,
  getFractionFromNumber,
  getFractionFromString,
} from '../src/utils';

describe('getGCD', () => {
  it('getGCD(3, 5) should be 1', () => {
    expect(getGCD(3, 5)).toBe(1);
  });

  it('getGCD(20, 12) should be 4', () => {
    expect(getGCD(20, 12)).toBe(4);
  });

  it('getGCD(20, 5) should be 5', () => {
    expect(getGCD(20, 5)).toBe(5);
  });
});

describe('getLCM', () => {
  it('getLCM(3, 5) should be 15', () => {
    expect(getLCM(3, 5)).toBe(15);
  });

  it('getGCD(20, 12) should be 60', () => {
    expect(getLCM(20, 12)).toBe(60);
  });

  it('getGCD(20, 5) should be 20', () => {
    expect(getLCM(20, 5)).toBe(20);
  });
});

describe('getDecimalsCount', () => {
  it('getDecimalsCount(.1) should be 1', () => {
    expect(getDecimalsCount('.1')).toBe(1);
  });

  it('getDecimalsCount(0.1) should be 1', () => {
    expect(getDecimalsCount(0.1)).toBe(1);
  });

  it('getDecimalsCount(5.112345678) should be 9', () => {
    expect(getDecimalsCount(5.112345678)).toBe(9);
  });
});

describe('adjustNegative', () => {
  it('adjustNegative can handle 2 negative numbers', () => {
    expect(adjustNegative({ numerator: -2, denominator: -3 })).toEqual({
      numerator: 2,
      denominator: 3,
    });
  });
});

describe('getFractionFromNumber', () => {
  it('getFractionFromNumber can handle NaN', () => {
    try {
      getFractionFromNumber(NaN);
    } catch (error) {
      expect(error.message).toEqual('Unsupported number NaN or Infinity');
    }
  });
});

describe('getFractionFromString', () => {
  it('getFractionFromString can handle one number', () => {
    const result = getFractionFromString('2');

    expect(result).toEqual({
      numerator: 2,
      denominator: 1,
    });
  });
});
