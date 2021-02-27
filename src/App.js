import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

function Button(props) {
  return (
    <div onClick={props.onClick} className='button'>
      {props.value}
    </div>
  );
}
function Display(props) {
  return (
    <div className="screen center-text">
      {props.value}
    </div>
  );
}

class AppUI extends Component {
  constructor(props) {
    super(props);
  }

  renderOperandButton(i) {
    return (
      <div className="button center-text" onClick={() => alert(i)}>
        {i}
      </div>
    );
  }

  renderNumberButton(i) {
    return (
      <div className="button center-text" onClick={() => this.props.onClickNumber(i)}>
        {i}
      </div>
    );
  }
  render() {
    return (
      <div>
        <Display value={this.props.displaynum} />
        <div className="buttons">
          <div className="number-board">
            {this.renderNumberButton(9)}
            {this.renderNumberButton(8)}
            {this.renderNumberButton(7)}
            {this.renderNumberButton(6)}
            {this.renderNumberButton(5)}
            {this.renderNumberButton(4)}
            {this.renderNumberButton(3)}
            {this.renderNumberButton(2)}
            {this.renderNumberButton(1)}
            {this.renderNumberButton(0)}
            {this.renderNumberButton('00')}
            {this.renderNumberButton('000')}
          </div>
          <div className="operation-board">
            {this.renderOperandButton('+')}
            {this.renderOperandButton('-')}
            {this.renderOperandButton('*')}
            {this.renderOperandButton('/')}
          </div>
        </div>
      </div>
    );
  }
}
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: 0,
      number2: 0,
      result: 0,
      displaynum: 0,
      operation: ''
    };
  }
  handleClick(i) {
    if (`${this.state.displaynum}`.length < 10)
      this.setState({
        displaynum: parseInt(this.state.displaynum + `${i}`)
      });
  }
  render() {
    return (
      <div>
        <div className='container'>
          <AppUI {...this.state} onClickNumber={(i) => this.handleClick(i)} />
        </div>
      </div>
    );
  }
}
export default Calculator;