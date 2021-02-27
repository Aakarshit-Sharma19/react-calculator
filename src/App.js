import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

function Button(props) {
  return (
    <div className="button center-text" onClick={() => props.onClick()} >
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
      <Button value={i} onClick={() => this.props.assignOperation(i)} />
    );
  }

  renderNumberButton(i) {
    return (
      <Button value={i} onClick={() => this.props.onClickNumber(i)} />
    );
  }
  render() {
    const clearButton = (
      <Button value={'C'} onClick={() => this.props.clearScreen()} />
    );
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
            {clearButton}
          </div>
          <div className="operation-board">
            {this.renderOperandButton('+')}
            {this.renderOperandButton('-')}
            {this.renderOperandButton('*')}
            {this.renderOperandButton('/')}
          </div>
          <div>
            <Button value={'='} onClick={() => this.props.evaluate()} />
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
      result: 0,
      displaynum: 0,
      operand: '',
      num: 0,
      displayBuffer: false,
      awaitingEvaluation: true
    };
  }
  clearScreen() {
    this.setState({
      result: 0,
      displaynum: 0,
      operand: '',
      num: 0,
      displayBuffer: false,
    });
  }

  handleClick(i) {
    if (this.state.displayBuffer) {
      this.setState({
        displayBuffer: false,
        displaynum: parseInt(i),
      })
    }
    else if (`${this.state.displaynum}`.length < 10)
      this.setState({
        displaynum: parseInt(this.state.displaynum + `${i}`)
      });

  }
  assignOperation(operand) {
    this.setState({
      operand: operand,
      result: this.state.displaynum,
      displayBuffer: true,
      // num: this.state.displaynum
    });
    if (this.state.awaitingEvaluation) {
      this.evaluate();
      this.setState({
        operand: operand,
      });
    }
    else this.setState({
      awaitingEvaluation: true
    });
  }
  evaluate() {
    let number1 = this.state.result;
    let number2 = this.state.displaynum;
    let operand = this.state.operand;
    if (number1 && number2 && operand) {
      let result = 0;
      switch (operand) {
        case '+':
          result = number1 + number2;
          break;
        case '-':
          result = number1 - number2;
          break;
        case '*':
          result = number1 * number2;
          break;
        case '/':
          result = number1 / number2;
          break;
      }
      this.setState({
        result: result,
        displaynum: result,
        operand: ''
      });
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <div className='container'>
          <AppUI
            {...this.state}
            onClickNumber={(i) => this.handleClick(i)}
            clearScreen={() => this.clearScreen()}
            assignOperation={(operand) => this.assignOperation(operand)}
            evaluate={() => this.evaluate()}
          />
        </div>
      </div>
    );
  }
}
export default Calculator;