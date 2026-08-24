// testFunc.js
// Anonymous Function Expression
const multiply = function (a, b) {
  return a * b;
};

const testFunc = function (a, b) {
  return a + b;
};

const testFunc3 = function (a, b) {
  return a * b;
};

// Named Function Expression
const divide = function divideFn(a, b) {
  return a / b;
};

// Export the functions
module.exports = {
  multiply,
  divide,
  testFunc,
  testFunc3
};

