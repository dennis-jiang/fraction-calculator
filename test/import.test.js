import fc from '../dist/fraction-calculator';

it('can support import', () => {
  let res = fc('1/3')
    .plus(0.5)
    .times('5/6')
    .minus('7/8')
    .div('1/3');

  expect(res.toString()).toEqual('-13/24');
});
