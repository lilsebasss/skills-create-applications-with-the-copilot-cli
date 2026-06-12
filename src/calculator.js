#!/usr/bin/env node
"use strict";
/**
 * CLI Calculator
 * Supported operations (as in the provided image):
 *  - add (+)
 *  - subtract (-)
 *  - multiply (×, *)
 *  - divide (÷, /)
 *
 * This file exports the functions: add, subtract, multiply, divide
 * and also provides a small CLI wrapper so it can be used from the
 * command line:
 *
 *   node src/calculator.js add 2 3       # => 5
 *   node src/calculator.js + 2 3         # => 5
 *   node src/calculator.js divide 10 2   # => 5
 *
 * Division-by-zero is handled with a clear error message and
 * non-zero exit code.
 */

// Core calculator functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    // Clear handling of division-by-zero
    throw new Error('Division by zero');
  }
  return a / b;
}

// Additional operations requested in issue #3
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(n);
}

// Helper to parse numbers and validate
function parseNumber(value, name = 'value') {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new Error(`${name} is not a valid number: ${value}`);
  }
  return n;
}

// Map accepted operator tokens to functions
const operators = {
  '+': add,
  'add': add,
  '-': subtract,
  'subtract': subtract,
  '*': multiply,
  'x': multiply,
  'X': multiply,
  'multiply': multiply,
  '×': multiply,
  '/': divide,
  'divide': divide,
  '÷': divide,
  '%': modulo,
  'mod': modulo,
  'modulo': modulo,
  'pow': power,
  '^': power,
  'power': power,
  '**': power,
  'sqrt': squareRoot,
  '√': squareRoot,
};

// CLI entrypoint
function printUsage() {
  console.log('Usage: node src/calculator.js <op> <a> <b>  OR  node src/calculator.js sqrt <a>');
  console.log('Supported operations: add(+), subtract(-), multiply(* or x), divide(/), modulo(%), power(** or pow), sqrt');
  console.log('Examples:');
  console.log('  node src/calculator.js + 2 3');
  console.log('  node src/calculator.js divide 10 2');
  console.log('  node src/calculator.js % 10 3');
  console.log('  node src/calculator.js pow 2 8');
  console.log('  node src/calculator.js sqrt 9');
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv.length < 2 || argv.length > 3) {
    printUsage();
    process.exit(2);
  }

  const [opToken, aRaw, bRaw] = argv;
  const opKey = opToken.trim();
  const fn = operators[opKey];
  if (!fn) {
    console.error(`Unknown operation: ${opToken}`);
    printUsage();
    process.exit(2);
  }

  try {
    let result;
    // squareRoot is a unary operator
    if (fn === squareRoot) {
      if (aRaw === undefined) {
        printUsage();
        process.exit(2);
      }
      const a = parseNumber(aRaw, 'a');
      result = fn(a);
    } else {
      if (bRaw === undefined) {
        printUsage();
        process.exit(2);
      }
      const a = parseNumber(aRaw, 'a');
      const b = parseNumber(bRaw, 'b');
      result = fn(a, b);
    }

    // Print result
    console.log(result);
    process.exit(0);
  } catch (err) {
    if (/division by zero/i.test(err.message)) {
      console.error('Error: division by zero');
      process.exit(1);
    }
    if (/modulo by zero/i.test(err.message)) {
      console.error('Error: modulo by zero');
      process.exit(1);
    }
    if (/square root of negative/i.test(err.message)) {
      console.error('Error: square root of negative number');
      process.exit(1);
    }
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Export functions for programmatic usage / tests
// Provide both short names and descriptive names expected by external checks
const addition = add;
const subtraction = subtract;
const multiplication = multiply;
const division = divide;

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  addition,
  subtraction,
  multiplication,
  division,
  // New operations from issue #3
  modulo,
  power,
  squareRoot,
};
