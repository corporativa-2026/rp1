import { test, expect } from 'vitest'
import { split } from './strings.js';

test('split string by separator', () => {
  const result = split('a,b,c', ',')
  expect(result).toEqual(['a', 'b', 'c'])
})

test('split string without separator', () => {
  const result = split('teste')
  expect(result).toEqual(['t', 'e', 's', 't', 'e'])
})