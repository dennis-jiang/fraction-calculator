import fc from '../dist/fraction-calculator.js';

it('can support import', () => {
  let res = fc('1/3')
    .plus(0.5)
    .times('5/6')
    .minus('7/8')
    .div('1/3')
    .plus(1.8)
    .pow(1.5)
    .sqrt();

  expect(res.toFraction()).toEqual('9819144506609588/8264695847981157');
});
