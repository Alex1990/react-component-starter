import React from 'react';
import { shallow } from 'enzyme';
import DiceRoll from './DiceRoll';

jest.useFakeTimers();

describe('DiceRoll', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DiceRoll />);
  });

  afterEach(() => {
    wrapper = null;
    jest.clearAllMocks();
  });

  test('the default state and props', () => {
    expect(wrapper.instance().props.prefixCls).toBe('dice-roll');
    expect(wrapper.state('rolling')).toBe(false);
    expect(wrapper.state('result')).toBe('');
  });

  test('should contain the roll button', () => {
    expect(wrapper.find('button.dice-roll-btn').length).toBe(1);
  });

  test('should contain the result element', () => {
    expect(wrapper.find('.dice-roll-result').length).toBe(1);
  });

  test('result should be empty at first', () => {
    expect(wrapper.find('.dice-roll-result').text()).toBe('');
  });

  test('onRoll should be called when click the roll button', () => {
    const spy = jest.spyOn(DiceRoll.prototype, 'onRoll');
    wrapper = shallow(<DiceRoll />);
    wrapper.find('button').simulate('click');
    expect(spy.mock.calls.length).toBe(1);
    spy.mockRestore();
  });

  test('should call the setTimeout with 2000ms when click the roll button', () => {
    wrapper.find('button').simulate('click');

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(2000);

    const spy = jest.spyOn(wrapper.instance(), 'setState');
    expect(spy).not.toBeCalled();

    jest.runAllTimers();

    expect(spy.mock.calls.length).toBe(1);
  });

  test('should change the state when click the roll button', () => {
    setTimeout.mockReturnValue(42);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('rolling')).toBe(true);
    expect(wrapper.state('rollTimer')).toBe(42);
    setTimeout.mockReset();
  });

  test('click the roll button', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.hasClass('dice-roll-rolling')).toBe(true);
    expect(wrapper.find('button').text()).toContain('Rolling');
    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  test('result should be respond to the state rightly', () => {
    wrapper.setState({ result: '⚀' });
    expect(wrapper.find('.dice-roll-result').text()).toBe('⚀');
  });

  test('should clear the roll timer after unmount', () => {
    wrapper.find('button').simulate('click');
    const rollTimer = wrapper.state('rollTimer');
    wrapper.unmount();
    expect(clearTimeout.mock.calls.length).toBe(1);
    expect(clearTimeout.mock.calls[0][0]).toBe(rollTimer);
  });
});
