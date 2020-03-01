import { getGCD, getLCM, getDecimalsCount } from '../src/utils';

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
