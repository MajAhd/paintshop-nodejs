const { isNil } = require("lodash");

const solver = (customers, colorCount) => {
  const lockedColorMap = new Map();

  const calculateCustomerPaint = (customer, paintCandidates = []) => {
    const paintOrders = customer.length;

    for (let i = 0; i < paintOrders; i++) {
      const paint = customer[i];
      const { color, type } = paint;
      const lockedType = lockedColorMap.get(color);

      // Customer only has ordered one paint
      if (paintOrders === 1) {
        // The paint type is not taken or other customer took the same type
        if (isNil(lockedType) || lockedType === type) {
          return paint;
        }
      } else if (!lockedType) {
        // If color is not locked add it to candidates
        paintCandidates.push(paint);
      } else if (lockedType === type) {
        // The same type has been locked by other customer so is valid
        return paint;
      }
    }

    // Customer didn't find a match in the locked paints
    return null;
  };

  // Return the solution array and fill rest of the colors with type 0
  const createSolutionArray = (solutionMap) => {
    const solution = [];

    // Start loop with color 1 till color n
    for (let color = 1; color <= colorCount; color++) {
      const value = solutionMap.get(color) || 0;
      solution.push(value);
    }

    return solution;
  };

  return () => {
    customers.sort(); // Sort customers by number of paints ordered, only one paint first

    const numCustomers = customers.length;

    for (let i = 0; i < numCustomers; i++) {
      if (customers[i].length === 1) {
        // If customer has only one paint resolve the only solution
        const paint = calculateCustomerPaint(customers[i]);
        if (!paint) {
          throw new Error("No solution");
        }
        lockedColorMap.set(paint.color, paint.type);
      } else {
        const paintCandidates = [];
        const lockedPaint = calculateCustomerPaint(
          customers[i],
          paintCandidates
        );

        if (!isNil(lockedPaint)) {
          // There is a paint already locked that satisfy the customer
          continue;
        } else if (paintCandidates.length === 0) {
          // There is not candidates for the customer, it need another paint
          // that is fixed by other customer with different type
          throw new Error("No solution");
        }

        // Select one paint for the customer and try to search if he would accept
        // a gloss (0) paint in his candidates, if not give him the first
        let selectedPaint = paintCandidates[0];
        const paintCandidatesCount = paintCandidates.length;

        for (let p = 0; p < paintCandidatesCount; p++) {
          if (paintCandidates[p].type === 0) {
            selectedPaint = paintCandidates[p];
          }
        }
        lockedColorMap.set(selectedPaint.color, selectedPaint.type);
      }
    }

    return createSolutionArray(lockedColorMap);
  };
};

module.exports = solver;
