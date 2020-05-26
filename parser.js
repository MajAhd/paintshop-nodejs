const fs = require("fs");

const parser = (file) => {
  const importFile = () => {
    try {
      return fs.readFileSync(file, "utf8");
    } catch (err) {
      console.log("loading file error!", err.stack);
    }
    return null;
  };

  const parseTestInput = (index, array) => {
    let indexPointer = index;
    const paintCount = parseInt(array[indexPointer], 10);

    indexPointer++; // move the pointer to next
    const customerCount = parseInt(array[indexPointer], 10);
    const customerArray = [];
    indexPointer++; // move the pointer to next
    let i;
    for (i = 0; i < customerCount; i++) {
      //  string customer convert to array
      const customerRawArray = array[i + indexPointer].split(" ");
      const [orderCount, ...orders] = customerRawArray;
      const customer = [];
      const orderLimit = parseInt(orderCount, 10) * 2;
      for (let j = 0; j < orderLimit; j += 2) {
        customer.push({
          color: parseInt(orders[j], 10),
          type: parseInt(orders[j + 1], 10),
        });
      }
      customerArray.push(customer);
    }
    return {
      test: {
        paintCount,
        customerCount,
        customerArray,
      },
      indexPointer: indexPointer + i,
    };
  };

  return () => {
    const dataImported = importFile();
    if (!dataImported) {
      return null;
    }

    const dataParsed = [];
    const linesArray = dataImported.toString().split("\n");
    const [testCount, ...restArray] = linesArray;
    //begining of each test in the array
    let indexPointer = 0;
    for (let i = 0; i < testCount; i++) {
      const { test, indexPointer: newPointer } = parseTestInput(
        indexPointer,
        restArray
      );
      indexPointer = newPointer;
      dataParsed.push(test);
    }
    return dataParsed;
  };
};

module.exports = parser;
