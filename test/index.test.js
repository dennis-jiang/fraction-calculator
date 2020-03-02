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
      numerator: 91,
      denominator: 20,
    });
  });

  it('can support negative decimals', () => {
    const instance = fc(-4.55);

    expect(instance.fraction).toEqual({
      numerator: -91,
      denominator: 20,
    });
  });

  it('can support string', () => {
    const instance = fc('15/35');

    expect(instance.fraction).toEqual({
      numerator: 3,
      denominator: 7,
    });
  });

  it('can support negative string', () => {
    const instance = fc('-15/35');

    expect(instance.fraction).toEqual({
      numerator: -3,
      denominator: 7,
    });
  });

  it('can support 2 negative strings', () => {
    const instance = fc('-15/-35');

    expect(instance.fraction).toEqual({
      numerator: 3,
      denominator: 7,
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
      numerator: 3,
      denominator: 7,
    });
  });

  it('cannot support object', () => {
    try {
      fc({});
    } catch (error) {
      expect(error.message).toEqual('Unsupported parameter [object Object]');
    }
  });
});

describe('fraction plus', () => {
  it('can support positive plus positive', () => {
    const result = fc('1/3').plus(0.5);
    expect(result.toString()).toEqual('5/6');

    const result2 = fc('+1/10').plus(0.2);
    expect(result2.toString()).toEqual('3/10');

    const result3 = fc(0.1).plus(0.3);
    expect(result3.toString()).toEqual('2/5');

    const result4 = fc('1 43/75').plus('23/62');
    expect(result4.toString()).toEqual('9041/4650');
  });

  it('can support negative plus positive', () => {
    const result = fc(-0.5).plus('1/3');
    expect(result.toString()).toEqual('-1/6');

    const result2 = fc('-1 1/10').plus(0.2);
    expect(result2.toString()).toEqual('-9/10');
  });

  it('can support negative plus positive equals 0', () => {
    const result = fc(-0.5).plus('1/2');
    expect(result.toString()).toEqual('0');
  });

  it('can support negative plus negative', () => {
    const result = fc(-0.5).plus('-1/3');
    expect(result.toString()).toEqual('-5/6');
  });
});

describe('fraction minus', () => {
  it('can support positive minus positive', () => {
    const result = fc('1/3').minus(0.5);
    expect(result.toString()).toEqual('-1/6');

    const result2 = fc(0.5).minus('1/3');
    expect(result2.toString()).toEqual('1/6');

    const result3 = fc(0.5).minus(0.5);
    expect(result3.toString()).toEqual('0');
  });

  it('can support negative minus negative', () => {
    const result = fc('-1/3').minus(-0.5);
    expect(result.toString()).toEqual('1/6');

    const result2 = fc(-0.5).minus('-1/3');
    expect(result2.toString()).toEqual('-1/6');

    const result3 = fc('-1/2').minus('-1/2');
    expect(result3.toString()).toEqual('0');
  });

  it('can support negative minus positive', () => {
    const result = fc('-1/3').minus(0.5);
    expect(result.toString()).toEqual('-5/6');

    const result2 = fc(-0.5).minus('1/3');
    expect(result2.toString()).toEqual('-5/6');

    const result3 = fc('-1/2').minus('1/2');
    expect(result3.toString()).toEqual('-1');
  });
});

describe('fraction times', () => {
  it('can support positive times positive', () => {
    const result = fc('1/3').times(0.5);
    expect(result.toString()).toEqual('1/6');

    const result2 = fc(0.5).times('1/3');
    expect(result2.toString()).toEqual('1/6');

    const result3 = fc(0).times('0/56');
    expect(result3.toString()).toEqual('0');
  });

  it('can support negative times positive', () => {
    const result = fc('-1/3').times(0.5);
    expect(result.toString()).toEqual('-1/6');

    const result2 = fc(-0.5).times('1/3');
    expect(result2.toString()).toEqual('-1/6');

    const result3 = fc(-0).times('0/56');
    expect(result3.toString()).toEqual('0');
  });

  it('can support negative times negative', () => {
    const result = fc('-1/3').times(-0.5);
    expect(result.toString()).toEqual('1/6');

    const result2 = fc(-0.5).times('-1/3');
    expect(result2.toString()).toEqual('1/6');

    const result3 = fc(-0).times('-0/56');
    expect(result3.toString()).toEqual('0');
  });
});

describe('fraction div', () => {
  it('can support positive div positive', () => {
    const result = fc('1/3').div(0.5);
    expect(result.toString()).toEqual('2/3');

    const result2 = fc(0.5).div('1/3');
    expect(result2.toString()).toEqual('3/2');

    const result3 = fc(0).div('1/56');
    expect(result3.toString()).toEqual('0');
  });

  it('can support negative div positive', () => {
    const result = fc('-1/3').div(0.5);
    expect(result.toString()).toEqual('-2/3');

    const result2 = fc(-0.5).div('1/3');
    expect(result2.toString()).toEqual('-3/2');

    const result3 = fc(-0).div('1/56');
    expect(result3.toString()).toEqual('0');
  });

  it('can support negative div negative', () => {
    const result = fc('-1/3').div(-0.5);
    expect(result.toString()).toEqual('2/3');

    const result2 = fc(-0.5).div('-1/3');
    expect(result2.toString()).toEqual('3/2');

    const result3 = fc(-0).div('-1/56');
    expect(result3.toString()).toEqual('0');
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

describe('fraction toString', () => {
  it('can support toString with whole part', () => {
    const result = fc('-1/3').div(-0.1);
    expect(result.toString(true)).toEqual('3 1/3');

    const result2 = fc('1/3').div(-0.1);
    expect(result2.toString(true)).toEqual('-3 1/3');

    const result3 = fc('1/3').div(-0.5);
    expect(result3.toString(true)).toEqual('-2/3');
  });
});

describe('fraction pow', () => {
  it('can support positive pow', () => {
    const result = fc('2/3').pow(2);
    expect(result.toString()).toEqual('4/9');

    const result2 = fc('2/3').pow(1.2);
    expect(result2.toString()).toEqual('1293319370881437/2103852523296128');

    const result3 = fc('-999').pow(9999);
    expect(result3.toString()).toEqual('-Infinity');

    const result4 = fc('2/3').pow(1 / 2);
    expect(result4.toString()).toEqual('6369051672525773/7800463371553962');
  });

  it('can support negative pow', () => {
    const result = fc('2/3').pow(-2);
    expect(result.toString()).toEqual('9/4');

    const result2 = fc('2/3').pow(-1 / 2);
    expect(result2.toString()).toEqual('7800463371553963/6369051672525772');

    const result3 = fc('4').pow(-1 / 2);
    expect(result3.toString()).toEqual('1/2');
  });
});

describe('fraction sqrt', () => {
  it('can support positive sqrt', () => {
    const result = fc('4').sqrt();
    expect(result.toString()).toEqual('2');

    const result2 = fc('2').sqrt();
    expect(result2.toString()).toEqual('6369051672525773/4503599627370496');
  });
});
