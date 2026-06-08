import { getPasswordStrength } from './passwordStrength';
import { describe, it, expect } from 'vitest';

describe('getPasswordStrength', () => {
  it('empty string returns all false and score 0', () => {
    const result = getPasswordStrength('');
    expect(result).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecialChar: false,
      score: 0,
    });
  });

  it('detects number', () => {
    expect(getPasswordStrength('abc1').hasNumber).toBe(true);
    expect(getPasswordStrength('abc').hasNumber).toBe(false);
  });

  it('detects uppercase', () => {
    expect(getPasswordStrength('Abc').hasUppercase).toBe(true);
    expect(getPasswordStrength('abc').hasUppercase).toBe(false);
  });

  it('detects lowercase', () => {
    expect(getPasswordStrength('ABC').hasLowercase).toBe(false);
    expect(getPasswordStrength('Abc').hasLowercase).toBe(true);
  });

  it('detects special character', () => {
    expect(getPasswordStrength('abc!').hasSpecialChar).toBe(true);
    expect(getPasswordStrength('abc').hasSpecialChar).toBe(false);
  });

  it('score equals number of satisfied criteria', () => {
    expect(getPasswordStrength('abc').score).toBe(1);
    expect(getPasswordStrength('Abc').score).toBe(2);
    expect(getPasswordStrength('Abc1').score).toBe(3);
    expect(getPasswordStrength('Abc1!').score).toBe(4);
  });
});
