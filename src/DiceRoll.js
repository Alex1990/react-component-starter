import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getRollingResult } from './util';

class DiceRoll extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
  };
  static defaultProps = {
    prefixCls: 'dice-roll',
  };

  constructor(props) {
    super(props);
    this.state = {
      rolling: false,
      result: '',
    };
    this.onRoll = this.onRoll.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.state.rollTimer);
  }

  onRoll() {
    const rollTimer = setTimeout(() => {
      this.setState({
        rolling: false,
        result: getRollingResult(),
      });
    }, 2000);
    this.setState({
      rollTimer,
      rolling: true,
    });
  }

  render() {
    const { prefixCls } = this.props;
    const { rolling, result } = this.state;
    const cls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-rolling`]: rolling,
    });

    return (
      <div className={cls}>
        <button
          className={`${prefixCls}-btn`}
          onClick={this.onRoll}
          disabled={rolling}
        >
          🎲 {rolling ? 'Rolling' : 'Roll it'}
        </button>
        <br />
        <span className={`${prefixCls}-result`}>{result}</span>
      </div>
    );
  }
}

export default DiceRoll;
