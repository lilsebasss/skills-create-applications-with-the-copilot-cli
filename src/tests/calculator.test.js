const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator core functions', () => {
  describe('addition', () => {
    test('adds positive integers (2 + 3)', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds negative and positive number (-1 + 4)', () => {
      expect(add(-1, 4)).toBe(3);
    });

    test('adds floats (2.5 + 0.5)', () => {
      expect(add(2.5, 0.5)).toBeCloseTo(3.0);
    });
  });

  describe('subtraction', () => {
    test('subtracts positive integers (10 - 4)', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('subtracts to negative result (3 - 7)', () => {
      expect(subtract(3, 7)).toBe(-4);
    });
  });

  describe('multiplication', () => {
    test('multiplies integers (45 * 2)', () => {
      expect(multiply(45, 2)).toBe(90);
    });

    test('multiplies by zero (5 * 0)', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    test('multiplies floats (2.5 * 2)', () => {
      expect(multiply(2.5, 2)).toBeCloseTo(5.0);
    });
  });

  describe('division', () => {
    test('divides integers (20 / 5)', () => {
      expect(divide(20, 5)).toBe(4);
    });

    test('divides to non-integer (7 / 2)', () => {
      expect(divide(7, 2)).toBeCloseTo(3.5);
    });

    test('throws on division by zero', () => {
      expect(() => divide(1, 0)).toThrow('Division by zero');
    });
  });

  describe('extended operations', () => {
    test('modulo: 5 % 2 => 1', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('modulo throws on modulo by zero', () => {
      expect(() => modulo(5, 0)).toThrow('Modulo by zero');
    });

    test('power: 2^3 => 8', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('power with floats: 2.5^2 => 6.25', () => {
      expect(power(2.5, 2)).toBeCloseTo(6.25);
    });

    test('squareRoot: sqrt(16) => 4', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('squareRoot throws on negative input', () => {
      expect(() => squareRoot(-9)).toThrow('Square root of negative number');
    });
  });
});
