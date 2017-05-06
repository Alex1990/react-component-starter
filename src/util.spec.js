import { getRollingResult } from './util';

describe('util', () => {
  test('getRollingResult', () => {
    const mockMath = Object.create(global.Math);
    global.Math = mockMath;

    mockMath.random = () => 0;
    expect(getRollingResult()).toBe('⚀');

    mockMath.random = () => 0.5;
    expect(getRollingResult()).toBe('⚃');

    mockMath.random = () => 0.9999;
    expect(getRollingResult()).toBe('⚅');
  });
});
