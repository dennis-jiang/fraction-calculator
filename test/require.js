const fc = require('../dist/fraction-calculator');

const res = fc('1/3')
  .plus(0.5)
  .times('5/6')
  .minus('7/8')
  .div('1/3');
console.log(res.toString());
