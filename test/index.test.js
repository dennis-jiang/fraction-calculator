import fc from '../src/index';

describe('FractionCalculator instance', () => {
  it('can support integer', () => {
    const instance = fc(4);

    expect(instance.fraction).toEqual({
      numerator: 4,
      denominator: 1,
    });
  });

  it('can support 0', () => {
    const instance = fc(0);

    expect(instance.fraction).toEqual({
      numerator: 0,
      denominator: 1,
    });
  });

  it('can support decimals', () => {
    const instance = fc(4.55);

    expect(instance.fraction).toEqual({
      numerator: 455,
      denominator: 100,
    });

    const instance2 = fc(1.1478);

    expect(instance2.fraction).toEqual({
      numerator: 11478,
      denominator: 10000,
    });
  });

  it('can support negative decimals', () => {
    const instance = fc(-4.55);

    expect(instance.fraction).toEqual({
      numerator: -455,
      denominator: 100,
    });

    const instance2 = fc(-1.1478);

    expect(instance2.fraction).toEqual({
      numerator: -11478,
      denominator: 10000,
    });
  });

  it('can support string', () => {
    const instance = fc('15/35');

    expect(instance.fraction).toEqual({
      numerator: 15,
      denominator: 35,
    });
  });

  it('can support negative string', () => {
    const instance = fc('-15/35');

    expect(instance.fraction).toEqual({
      numerator: -15,
      denominator: 35,
    });
  });

  it('can support negative string in denominator', () => {
    const instance = fc('15/-35');

    expect(instance.fraction).toEqual({
      numerator: -15,
      denominator: 35,
    });
  });

  it('can support 2 negative strings', () => {
    const instance = fc('-15/-35');

    expect(instance.fraction).toEqual({
      numerator: 15,
      denominator: 35,
    });
  });

  it('can detect 0 string', () => {
    try {
      fc('-15/0');
    } catch (error) {
      expect(error.message).toEqual("Denominator can't be 0 or NaN");
    }
  });

  it('can support another instance', () => {
    const instance = fc('-15/-35');
    const instance2 = fc(instance);
    const instance3 = fc(instance2);

    expect(instance3.fraction).toEqual({
      numerator: 15,
      denominator: 35,
    });
  });

  it('cannot support object', () => {
    try {
      fc({});
    } catch (error) {
      expect(error.message).toEqual('Unsupported parameter [object Object]');
    }
  });

  it('can handle NaN', () => {
    try {
      fc(NaN);
    } catch (error) {
      expect(error.message).toEqual('Unsupported number NaN or Infinity');
    }
  });

  it('can handle one number', () => {
    const result = fc('2');

    expect(result.fraction).toEqual({
      numerator: 2,
      denominator: 1,
    });
  });

  it('can handle cycle number', () => {
    const result = fc("0.22'8'");
    expect(result.toFraction()).toEqual('103/450');

    const result2 = fc('0.22(8)');
    expect(result2.toFraction()).toEqual('103/450');

    const result3 = fc('0.(4568)');
    expect(result3.toFraction()).toEqual('4568/9999');

    const result4 = fc("0.'4568'");
    expect(result4.toFraction()).toEqual('4568/9999');

    const result5 = fc("158.'4568'");
    expect(result5.toFraction()).toEqual('1584410/9999');

    const result6 = fc('298.22(876)');
    expect(result6.toFraction()).toEqual('4965509/16650');

    const result7 = fc('.22(8)');
    expect(result7.toFraction()).toEqual('103/450');

    const result8 = fc('0.(123456789022222)');
    expect(result8.toFraction()).toEqual('123456789022222/999999999999999');
  });

  it('can handle negative cycle number', () => {
    const result = fc("-0.22'8'");
    expect(result.toFraction()).toEqual('-103/450');

    const result2 = fc('-0.22(8)');
    expect(result2.toFraction()).toEqual('-103/450');

    const result3 = fc('-0.(4568)');
    expect(result3.toFraction()).toEqual('-4568/9999');

    const result4 = fc("-0.'4568'");
    expect(result4.toFraction()).toEqual('-4568/9999');

    const result5 = fc("-158.'4568'");
    expect(result5.toFraction()).toEqual('-1584410/9999');

    const result6 = fc('-298.22(876)');
    expect(result6.toFraction()).toEqual('-4965509/16650');

    const result7 = fc('-.22(8)');
    expect(result7.toFraction()).toEqual('-103/450');

    const result8 = fc('-0.(123456789022222)');
    expect(result8.toFraction()).toEqual('-123456789022222/999999999999999');
  });

  it('can handle two numbers', () => {
    const result = fc(12, 25);
    expect(result.toFraction()).toEqual('12/25');

    const result2 = fc(-12, 25);
    expect(result2.toFraction()).toEqual('-12/25');

    const result3 = fc(12, -25);
    expect(result3.toFraction()).toEqual('-12/25');

    const result4 = fc(-12, -25);
    expect(result4.toFraction()).toEqual('12/25');

    const result5 = fc(-12, 0);
    expect(result5.toFraction()).toEqual('-12');
  });
});

describe('fraction plus', () => {
  it('can support positive plus positive', () => {
    const result = fc('1/3').plus(0.5);
    expect(result.toFraction()).toEqual('5/6');

    const result2 = fc('+1/10').plus(0.2);
    expect(result2.toFraction()).toEqual('3/10');

    const result3 = fc(0.1).plus(0.3);
    expect(result3.toFraction()).toEqual('2/5');

    const result4 = fc('1 43/75').plus('23/62');
    expect(result4.toFraction()).toEqual('9041/4650');
  });

  it('can support negative plus positive', () => {
    const result = fc(-0.5).plus('1/3');
    expect(result.toFraction()).toEqual('-1/6');

    const result2 = fc('-1 1/10').plus(0.2);
    expect(result2.toFraction()).toEqual('-9/10');
  });

  it('can support negative plus positive equals 0', () => {
    const result = fc(-0.5).plus('1/2');
    expect(result.toFraction()).toEqual('0');
  });

  it('can support negative plus negative', () => {
    const result = fc(-0.5).plus('-1/3');
    expect(result.toFraction()).toEqual('-5/6');
  });
});

describe('fraction minus', () => {
  it('can support positive minus positive', () => {
    const result = fc('1/3').minus(0.5);
    expect(result.toFraction()).toEqual('-1/6');

    const result2 = fc(0.5).minus('1/3');
    expect(result2.toFraction()).toEqual('1/6');

    const result3 = fc(0.5).minus(0.5);
    expect(result3.toFraction()).toEqual('0');
  });

  it('can support negative minus negative', () => {
    const result = fc('-1/3').minus(-0.5);
    expect(result.toFraction()).toEqual('1/6');

    const result2 = fc(-0.5).minus('-1/3');
    expect(result2.toFraction()).toEqual('-1/6');

    const result3 = fc('-1/2').minus('-1/2');
    expect(result3.toFraction()).toEqual('0');
  });

  it('can support negative minus positive', () => {
    const result = fc('-1/3').minus(0.5);
    expect(result.toFraction()).toEqual('-5/6');

    const result2 = fc(-0.5).minus('1/3');
    expect(result2.toFraction()).toEqual('-5/6');

    const result3 = fc('-1/2').minus('1/2');
    expect(result3.toFraction()).toEqual('-1');
  });
});

describe('fraction times', () => {
  it('can support positive times positive', () => {
    const result = fc('1/3').times(0.5);
    expect(result.toFraction()).toEqual('1/6');

    const result2 = fc(0.5).times('1/3');
    expect(result2.toFraction()).toEqual('1/6');

    const result3 = fc(0).times('0/56');
    expect(result3.toFraction()).toEqual('0');

    const result4 = fc('1/3.5').times(0.5);
    expect(result4.toFraction()).toEqual('1/7');
  });

  it('can support negative times positive', () => {
    const result = fc('-1/3').times(0.5);
    expect(result.toFraction()).toEqual('-1/6');

    const result2 = fc(-0.5).times('1/3');
    expect(result2.toFraction()).toEqual('-1/6');

    const result3 = fc(-0).times('0/56');
    expect(result3.toFraction()).toEqual('0');
  });

  it('can support negative times negative', () => {
    const result = fc('-1/3').times(-0.5);
    expect(result.toFraction()).toEqual('1/6');

    const result2 = fc(-0.5).times('-1/3');
    expect(result2.toFraction()).toEqual('1/6');

    const result3 = fc(-0).times('-0/56');
    expect(result3.toFraction()).toEqual('0');
  });
});

describe('fraction div', () => {
  it('can support positive div positive', () => {
    const result = fc('1/3').div(0.5);
    expect(result.toFraction()).toEqual('2/3');

    const result2 = fc(0.5).div('1/3');
    expect(result2.toFraction()).toEqual('3/2');

    const result3 = fc(0).div('1/56');
    expect(result3.toFraction()).toEqual('0');
  });

  it('can support negative div positive', () => {
    const result = fc('-1/3').div(0.5);
    expect(result.toFraction()).toEqual('-2/3');

    const result2 = fc(-0.5).div('1/3');
    expect(result2.toFraction()).toEqual('-3/2');

    const result3 = fc(-0).div('1/56');
    expect(result3.toFraction()).toEqual('0');
  });

  it('can support negative div negative', () => {
    const result = fc('-1/3').div(-0.5);
    expect(result.toFraction()).toEqual('2/3');

    const result2 = fc(-0.5).div('-1/3');
    expect(result2.toFraction()).toEqual('3/2');

    const result3 = fc(-0).div('-1/56');
    expect(result3.toFraction()).toEqual('0');
  });
});

describe('fraction toFixed', () => {
  it('can support toFixed', () => {
    const result = fc('-1/3').div(-0.5);
    expect(result.toFixed()).toEqual('1');

    const result2 = fc(-0.5).div('1/3');
    expect(result2.toFixed(2)).toEqual('-1.50');
  });
});

describe('fraction toFraction', () => {
  it('can support toFraction with whole part', () => {
    const result = fc('-1/3').div(-0.1);
    expect(result.toFraction(true)).toEqual('3 1/3');

    const result2 = fc('1/3').div(-0.1);
    expect(result2.toFraction(true)).toEqual('-3 1/3');

    const result3 = fc('1/3').div(-0.5);
    expect(result3.toFraction(true)).toEqual('-2/3');
  });
});

describe('fraction pow', () => {
  it('can support positive pow', () => {
    const result = fc('2/3').pow(2);
    expect(result.toFraction()).toEqual('4/9');

    const result2 = fc('2/3').pow(1.2);
    expect(result2.toFraction()).toEqual('2871745887492587/4671491023558190');

    const result4 = fc('2/3').pow(1 / 2);
    expect(result4.toFraction()).toEqual('3535533905932738/4330127018922193');

    const result5 = fc('1/99999999').pow(9999);
    expect(result5.toFraction()).toEqual('0');
  });

  it('can support negative pow', () => {
    const result = fc('2/3').pow(-2);
    expect(result.toFraction()).toEqual('9/4');

    const result2 = fc('2/3').pow(-1 / 2);
    expect(result2.toFraction()).toEqual('787295821622217/642824346533225');

    const result3 = fc('4').pow(-1 / 2);
    expect(result3.toFraction()).toEqual('1/2');
  });

  it('can support 0', () => {
    const result = fc('2/3').pow(0);
    expect(result.toFraction()).toEqual('1');
  });

  it('can handle Infinity', () => {
    try {
      fc('888/999').pow(999);
    } catch (error) {
      expect(error.message).toEqual('Numerator reached Infinity');
    }

    try {
      fc('-999').pow(9999);
    } catch (error) {
      expect(error.message).toEqual('Numerator reached Infinity');
    }
  });
});

describe('fraction sqrt', () => {
  it('can support positive sqrt', () => {
    const result = fc('4').sqrt();
    expect(result.toFraction()).toEqual('2');

    const result2 = fc('2').sqrt();
    expect(result2.toFraction()).toEqual('1767766952966369/1250000000000000');
  });
});

describe('fraction gcd', () => {
  it('fc.gcd(3, 5) should be 1', () => {
    expect(fc.gcd(3, 5)).toBe(1);
  });

  it('fc.gcd(20, 12) should be 4', () => {
    expect(fc.gcd(20, 12)).toBe(4);
  });

  it('fc.gcd(20, 5) should be 5', () => {
    expect(fc.gcd(20, 5)).toBe(5);
  });

  it('fc.gcd(20, -5) should be 5', () => {
    expect(fc.gcd(20, -5)).toBe(5);
  });

  it('can handle NaN', () => {
    try {
      fc.gcd(2, NaN);
    } catch (error) {
      expect(error.message).toEqual('Invalid Parameter');
    }
  });
});

describe('fraction lcm', () => {
  it('fc.lcm(3, 5) should be 15', () => {
    expect(fc.lcm(3, 5)).toBe(15);
  });

  it('fc.lcm(20, 12) should be 60', () => {
    expect(fc.lcm(20, 12)).toBe(60);
  });

  it('fc.lcm(20, 5) should be 20', () => {
    expect(fc.lcm(20, 5)).toBe(20);
  });

  it('can handle NaN', () => {
    try {
      fc.lcm(2, NaN);
    } catch (error) {
      expect(error.message).toEqual('Invalid Parameter');
    }
  });
});

describe('fraction sqrt', () => {
  it('can handle sqrt 4/9', () => {
    const result = fc('4/9').sqrt();
    expect(result.toFraction()).toEqual('2/3');
  });

  it('can handle sqrt 0', () => {
    const result = fc(0).sqrt();
    expect(result.toNumber()).toEqual(0);
  });

  it('can handle sqrt -5.2', () => {
    try {
      fc(-5.2).sqrt();
    } catch (error) {
      expect(error.message).toEqual('Sqrt number cannot less than 0');
    }
  });
});

describe('fraction abs', () => {
  it('can handle 5.9', () => {
    const result = fc(5.9).abs();
    expect(result.toFraction(true)).toEqual('5 9/10');
  });

  it('can handle -25/36', () => {
    const result = fc('-25/36').abs();
    expect(result.toFraction(true)).toEqual('25/36');
  });
});

describe('fraction neg', () => {
  it('can handle 5.9', () => {
    const result = fc(5.9).neg();
    expect(result.toFraction(true)).toEqual('-5 9/10');
  });

  it('can handle -25/36', () => {
    const result = fc('-25/36').neg();
    expect(result.toFraction()).toEqual('25/36');
  });
});

describe('fraction inverse', () => {
  it('can handle 5.9', () => {
    const result = fc(5.9).inverse();
    expect(result.toFraction(true)).toEqual('10/59');
  });

  it('can handle -25/36', () => {
    const result = fc('-25/36').inverse();
    expect(result.toFraction(true)).toEqual('-1 11/25');
  });
});

describe('fraction clone', () => {
  it('can handle 5.9', () => {
    const fc1 = fc(1.5);
    const fc2 = fc1.clone();

    fc1.plus('-1/2');

    expect(fc1.toNumber()).toEqual(1);
    expect(fc2.toNumber()).toEqual(1.5);
  });
});

describe('fraction ceil', () => {
  it('can handle ceil', () => {
    const res1 = fc(1.5)
      .ceil()
      .toNumber();
    expect(res1).toEqual(2);

    const res2 = fc(-1.5)
      .ceil()
      .toNumber();
    expect(res2).toEqual(-1);
  });
});

describe('fraction floor', () => {
  it('can handle floor', () => {
    const res1 = fc('3/2')
      .floor()
      .toNumber();
    expect(res1).toEqual(1);

    const res2 = fc('-3/2')
      .floor()
      .toNumber();
    expect(res2).toEqual(-2);
  });
});

describe('fraction round', () => {
  it('can handle round', () => {
    const res1 = fc('3/2')
      .round()
      .toNumber();
    expect(res1).toEqual(2);

    const res2 = fc('-3/2')
      .round()
      .toNumber();
    expect(res2).toEqual(-1);
  });
});

describe('fraction equals', () => {
  it('can handle equals', () => {
    const res1 = fc('3/2').equals('6/4');
    expect(res1).toEqual(true);

    const res2 = fc('-3/2').equals('-6/4');
    expect(res2).toEqual(true);

    const res3 = fc('3/2').equals('9/4');
    expect(res3).toEqual(false);
  });
});

describe('fraction greaterThan', () => {
  it('can handle greaterThan', () => {
    const res1 = fc('3/2').greaterThan('6/4');
    expect(res1).toEqual(false);

    const res2 = fc('-3/2').greaterThan('-4/2');
    expect(res2).toEqual(true);

    const res3 = fc('3/2').greaterThan('15/4');
    expect(res3).toEqual(false);
  });
});

describe('fraction lessThan', () => {
  it('can handle lessThan', () => {
    const res1 = fc('3/2').lessThan('6/4');
    expect(res1).toEqual(false);

    const res2 = fc('-3/2').lessThan('-4/2');
    expect(res2).toEqual(false);

    const res3 = fc('3/2').lessThan('15/4');
    expect(res3).toEqual(true);
  });
});

describe('fraction mod', () => {
  it('can handle mod', () => {
    const res1 = fc('3/2').mod('1/2');
    expect(res1.toFraction()).toEqual('0');

    const res2 = fc('-29/3').mod(5);
    expect(res2.toFraction()).toEqual('-14/3');

    const res3 = fc('158/5').mod('3/5');
    expect(res3.toFraction()).toEqual('2/5');

    const res4 = fc('29/3').mod(-5);
    expect(res4.toFraction()).toEqual('14/3');
  });
});

describe('fraction DISABLE_REDUCE', () => {
  it('can disable reduce', () => {
    fc.DISABLE_REDUCE = true;

    const res1 = fc('15/35').toFraction();
    expect(res1).toEqual('15/35');

    fc.DISABLE_REDUCE = false;

    const res2 = fc('15/35').toFraction();
    expect(res2).toEqual('3/7');
  });
});

describe('fraction toRecurringDecimal', () => {
  it('can handle positive', () => {
    const res = fc('2/9').toRecurringDecimal();
    expect(res).toEqual('0.(2)');

    const res2 = fc('5/7').toRecurringDecimal();
    expect(res2).toEqual('0.(714285)');

    const res3 = fc('7/15').toRecurringDecimal();
    expect(res3).toEqual('0.4(6)');

    const res4 = fc('3/28').toRecurringDecimal();
    expect(res4).toEqual('0.10(714285)');

    const res5 = fc('3867/28').toRecurringDecimal();
    expect(res5).toEqual('138.10(714285)');

    const res6 = fc('123/456').toRecurringDecimal();
    expect(res6).toEqual('0.269(736842105263157894)');

    const res7 = fc('355/113').toRecurringDecimal();
    expect(res7).toEqual(
      '3.(1415929203539823008849557522123893805309734513274336283185840707964601769911504424778761061946902654867256637168)',
    );

    const res8 = fc('19 123/456').toRecurringDecimal();
    expect(res8).toEqual('19.269(736842105263157894)');

    const res9 = fc('1999999999 123/456').toRecurringDecimal();
    expect(res9).toEqual('1999999999.269(736842105263157894)');

    const res10 = fc('25/80').toRecurringDecimal();
    expect(res10).toEqual('0.3125');

    const res11 = fc('2/99').toRecurringDecimal();
    expect(res11).toEqual('0.(02)');

    const res12 = fc('2/99999').toRecurringDecimal();
    expect(res12).toEqual('0.(00002)');

    const res13 = fc('1902346/124875').toRecurringDecimal();
    expect(res13).toEqual('15.234(002)');

    const res14 = fc('19 123/45600').toRecurringDecimal();
    expect(res14).toEqual('19.00269(736842105263157894)');

    const res15 = fc('892/2').toRecurringDecimal();
    expect(res15).toEqual('446');

    const res16 = fc('123.4(56)').toRecurringDecimal();
    expect(res16).toEqual('123.4(56)');

    const res17 = fc("123.4'56'").toRecurringDecimal();
    expect(res17).toEqual('123.4(56)');
  });

  it('can handle negative', () => {
    const res = fc('-2/9').toRecurringDecimal();
    expect(res).toEqual('-0.(2)');

    const res2 = fc('-5/7').toRecurringDecimal();
    expect(res2).toEqual('-0.(714285)');

    const res3 = fc('-7/15').toRecurringDecimal();
    expect(res3).toEqual('-0.4(6)');

    const res4 = fc('-3/28').toRecurringDecimal();
    expect(res4).toEqual('-0.10(714285)');

    const res5 = fc('-3867/28').toRecurringDecimal();
    expect(res5).toEqual('-138.10(714285)');

    const res6 = fc('-123/456').toRecurringDecimal();
    expect(res6).toEqual('-0.269(736842105263157894)');

    const res7 = fc('-355/113').toRecurringDecimal();
    expect(res7).toEqual(
      '-3.(1415929203539823008849557522123893805309734513274336283185840707964601769911504424778761061946902654867256637168)',
    );

    const res8 = fc('-19 123/456').toRecurringDecimal();
    expect(res8).toEqual('-19.269(736842105263157894)');

    const res9 = fc('-1999999999 123/456').toRecurringDecimal();
    expect(res9).toEqual('-1999999999.269(736842105263157894)');

    const res10 = fc('-25/80').toRecurringDecimal();
    expect(res10).toEqual('-0.3125');

    const res11 = fc('-2/99').toRecurringDecimal();
    expect(res11).toEqual('-0.(02)');

    const res12 = fc('-2/99999').toRecurringDecimal();
    expect(res12).toEqual('-0.(00002)');

    const res13 = fc('-1902346/124875').toRecurringDecimal();
    expect(res13).toEqual('-15.234(002)');

    const res14 = fc('-19 123/45600').toRecurringDecimal();
    expect(res14).toEqual('-19.00269(736842105263157894)');

    const res15 = fc('-892/2').toRecurringDecimal();
    expect(res15).toEqual('-446');

    const res16 = fc('-123.4(56)').toRecurringDecimal();
    expect(res16).toEqual('-123.4(56)');

    const res17 = fc("-123.4'56'").toRecurringDecimal();
    expect(res17).toEqual('-123.4(56)');

    const res18 = fc('1/3')
      .plus(0.5)
      .times('28/13')
      .minus('7/15')
      .div('87/23')
      .pow(6)
      .sqrt()
      .toRecurringDecimal();
    expect(res18.length).toEqual(3002);
  });
});
