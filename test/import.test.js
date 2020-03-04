import fc from '../dist/fraction-calculator.min.js';

it('can support import', () => {
  let res = fc('1/3')
    .plus(0.5)
    .times('5/6')
    .minus('7/8')
    .div('1/3')
    .plus(1.8)
    .pow(1.5)
    .sqrt();

  expect(res.toString()).toEqual('6909608678291248/5815762678327879');
});
