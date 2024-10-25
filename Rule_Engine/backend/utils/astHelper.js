class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// Enhanced parser function to convert rule string to AST

const VALID_FIELDS = ['age', 'salary', 'experience', 'department']; // Valid fields

function parseRule(ruleString) {
  const tokens = ruleString.match(/(\w+\s[><=]\s\d+|\w+\s=\s'\w+'|\bAND\b|\bOR\b|\(|\))/g);
  if (!tokens) {
    throw new Error('Invalid rule string format');
  }

  let stack = [];
  let operatorStack = [];
  let fields = [];

  tokens.forEach(token => {
    if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
        const operator = operatorStack.pop();
        const right = stack.pop();
        const left = stack.pop();
        stack.push(new Node('operator', operator, left, right));
      }
      operatorStack.pop();
    } else if (token === 'AND' || token === 'OR') {
      operatorStack.push(token);
    } else {
      const parts = token.split(' ');
      const field = parts[0];
      const operator = parts[1];

      // Validate the field
      if (!VALID_FIELDS.includes(field)) {
        throw new Error(`Invalid field: ${field}. Allowed fields: ${VALID_FIELDS.join(', ')}`);
      }

      stack.push(new Node('operand', token));
      fields.push({ field_name: field, operator });
    }
  });

  while (operatorStack.length) {
    const operator = operatorStack.pop();
    const right = stack.pop();
    const left = stack.pop();
    stack.push(new Node('operator', operator, left, right));
  }

  return { ast: stack[0], fields };
}




// function parseRule(ruleString) {
//   const tokens = ruleString.match(/(\w+\s[><=]\s\d+|\w+\s=\s'\w+'|\bAND\b|\bOR\b|\(|\))/g);
//   let stack = [];
//   let operatorStack = [];
//   let fields = [];

//   tokens.forEach(token => {
//     if (token === '(') {
//       operatorStack.push(token);
//     } else if (token === ')') {
//       while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
//         const operator = operatorStack.pop();
//         const right = stack.pop();
//         const left = stack.pop();
//         stack.push(new Node('operator', operator, left, right));
//       }
//       operatorStack.pop();
//     } else if (token === 'AND' || token === 'OR') {
//       operatorStack.push(token);
//     } else {
//       stack.push(new Node('operand', token));
//       const parts = token.split(' ');
//       const field = parts[0];
//       const operator = parts[1];
//       fields.push({ field_name: field, operator });
//     }
//   });

//   while (operatorStack.length) {
//     const operator = operatorStack.pop();
//     const right = stack.pop();
//     const left = stack.pop();
//     stack.push(new Node('operator', operator, left, right));
//   }

//   return { ast: stack[0], fields };
// }

// Combine rule strings into a single AST
const combineRules = (ruleStrings) => {
  const root = new Node('operator', 'OR'); // Create a root operator node

  ruleStrings.forEach(ruleString => {
    const ast = parseRule(ruleString); // Parse each rule string into an AST
    if (!root.left) {
      root.left = ast; // Set the left child
    } else {
      // If there's already a left child, chain it with the right
      root.right = ast; // Create a chain of ORs
      root.left = new Node('operator', 'OR', root.left, root.right);
    }
  });

  return root; // Return the combined AST
};


// Function to evaluate the AST against provided data
function evaluateRule(ast, data) {
  if (!ast) return false;

  console.log(`Evaluating AST: ${JSON.stringify(ast)}, with data: ${JSON.stringify(data)}`);


  // Evaluate operand nodes
  if (ast.type === 'operand') {
    const [field, operator, value] = ast.value.split(' ');

    switch (operator) {
      case '>':
        return data[field] > parseFloat(value);
      case '<':
        return data[field] < parseFloat(value);
      case '>=':
        return data[field] >= parseFloat(value);
      case '<=':
        return data[field] <= parseFloat(value);
      case '=':
        return data[field] == value.replace(/'/g, ''); // Handle string equality
      default:
        return false;
    }
  }

  // Evaluate operator nodes
  if (ast.type === 'operator') {
    const leftEval = evaluateRule(ast.left, data);
    const rightEval = evaluateRule(ast.right, data);

    if (ast.value === 'AND') {
      return leftEval && rightEval;
    } else if (ast.value === 'OR') {
      return leftEval || rightEval;
    }
  }

  return false;
}



module.exports = { parseRule, combineRules,evaluateRule }; // Ensure both functions are exported
