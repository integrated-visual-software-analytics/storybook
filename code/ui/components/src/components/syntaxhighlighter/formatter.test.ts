import { describe, it, expect } from 'vitest';
import { dedent } from 'ts-dedent';

import { formatter } from './formatter';

describe('dedent', () => {
  it('handles empty string', () => {
    const input = '';
    const result = formatter(true, input);

    expect(result).toBe(input);
  });

  it('handles single line', () => {
    const input = 'console.log("hello world")';
    const result = formatter(true, input);

    expect(result).toBe(input);
  });

  it('does not transform correct code', () => {
    const input = dedent`
    console.log("hello");
    console.log("world");
  `;
    const result = formatter(true, input);

    expect(result).toBe(input);
  });

  it('does transform incorrect code', () => {
    const input = `
    console.log("hello");
    console.log("world");
  `;
    const result = formatter(true, input);

    expect(result).toBe(`console.log("hello");
console.log("world");`);
  });

  it('more indentations - skip first line', () => {
    const input = `
    it('handles empty string', () => {
      const input = '';
      const result = formatter(input);
    
      expect(result).toBe(input);
    });
  `;
    const result = formatter(true, input);

    expect(result).toBe(`it('handles empty string', () => {
  const input = '';
  const result = formatter(input);

  expect(result).toBe(input);
});`);
  });

  it('more indentations - code on first line', () => {
    const input = `// some comment
    it('handles empty string', () => {
      const input = '';
      const result = formatter(input);
    
      expect(result).toBe(input);
    });
  `;
    const result = formatter(true, input);

    expect(result).toBe(`// some comment
it('handles empty string', () => {
  const input = '';
  const result = formatter(input);

  expect(result).toBe(input);
});`);
  });

  it('removes whitespace in empty line completely', () => {
    const input = `
    console.log("hello");

    console.log("world");
  `;
    const result = formatter(true, input);

    expect(result).toBe(`console.log("hello");

console.log("world");`);
  });
});

describe('prettier (babel)', () => {
  it('handles empty string', () => {
    const input = '';
    const result = formatter('angular', input);

    expect(result).toBe(input);
  });

  it('handles single line', () => {
    const input = 'console.log("hello world")';
    const result = formatter('angular', input);

    expect(result).toBe(input);
  });
});
