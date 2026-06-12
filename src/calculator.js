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
};

// CLI entrypoint
function printUsage() {
  console.log('Usage: node src/calculator.js <op> <a> <b>');
  console.log('Supported operations: add(+), subtract(-), multiply(* or x), divide(/)');
  console.log('Examples:');
  console.log('  node src/calculator.js + 2 3');
  console.log('  node src/calculator.js divide 10 2');
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv.length !== 3) {
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
    const a = parseNumber(aRaw, 'a');
    const b = parseNumber(bRaw, 'b');
    const result = fn(a, b);
    // Print as plain number, but preserve integer formatting when possible
    if (Number.isInteger(result)) {
      console.log(result);
    } else {
      console.log(result);
    }
    process.exit(0);
  } catch (err) {
    if (/division by zero/i.test(err.message)) {
      console.error('Error: division by zero');
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
};
