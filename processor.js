const solver = require("./solver");

const processor = (test) => {
  const { paintCount, customerArray } = test;

  const solve = solver(customerArray, paintCount);

  try {
    return solve();
  } catch (err) {
    return null;
  }
};

module.exports = processor;
