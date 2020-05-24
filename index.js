const parser = require("./parser");
const processor = require("./processor");
const input_file = "input.txt";

const parseFile = parser(input_file);
const dataParsed = parseFile();
if (!dataParsed) {
  console.log("The input file could't be parsed");
  process.exit(1);
}

const testCount = dataParsed.length;
// For each test process the orders
for (let i = 0; i < testCount; i++) {
  const case_number = i + 1;
  const test = dataParsed[i];
  const solution = processor(test);

  if (solution) {
    // print the valid solution array parsing to string and separate elemnts with empty space
    console.log("CASE #%s:", case_number, solution.join(" "));
  } else {
    console.log("CASE #%s: IMPOSSIBLE", case_number);
  }
}
