import React, { Component } from "react";
import "../css/main.css";
import Calclator from "./Calculator";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeInput: "",
      currentInput: "",
      inputStack: []
    };
    this.decimalCount = 0; // to count decimal at one time eg 9....1 occures multiple times case 5
    this.calculteButtonClicked = false; // case 6 check if calculate clicked
  }

  handleInputChange = (num, type) => {
    let input = this.state.completeInput;
    let currentinput = this.state.currentInput;
    if (!this.state.completeInput && type !== "number") {
      // check *-+?/ case 2
      return;
    } else if (!this.state.completeInput && type === "number" && num === "0") {
      // zero initial "0000" case 3
      return;
    } else if (
      // multiple 99 ***** in input case4
      type !== "number" &&
      this.checkPeek()
    ) {
      // case 9 if 99+ then * comes, replace +
      let completeInput = this.state.completeInput;
      completeInput = completeInput.slice(0, -1);
      completeInput += num;
      this.setState({ completeInput });
      return;
    } else if (type === "decimal" && this.decimalCount !== 0) {
      // case 5 when decimal comes second time
      // for multiple decimal
      return;
    } else if (type === "number" && this.calculteButtonClicked) {
      // case 6, after calulate clicked, if another number comes, clear inputs and add new input
      input = "";
      currentinput = "";
    }

    input = input + num;
    if (type === "number" || type === "decimal") {
      currentinput = currentinput + num;
      if (type === "decimal") {
        // case 5 when decimal coumes first time
        this.decimalCount = 1;
      } else {
        this.decimalCount = 0; // case 5 reset when number comes after one decimal
      }
    }
    if (type === "number") {
      this.heandleInputStack(currentinput);
    }
    this.setState({
      completeInput: input,
      currentInput: currentinput
    });
    this.calculteButtonClicked = false; // case 6 reset calculate, input success
  };

  handleBackspace = () => {
    let input = this.state.completeInput;
    let currentinput = this.state.currentInput;
    let inputStack = [...this.state.inputStack];
    if (this.checkPeek()) {
      // case 8 if stack has symbol at top
      inputStack.pop();
      input = input.slice(0, -1);
    } else {
      // case 8 if stack has number at top
      input = input.slice(0, -1);
      if (currentinput.length > 0) {
        currentinput = currentinput.slice(0, -1);
      }
      inputStack.pop(); // case 8 firt pop and then push
      if (currentinput !== "") {
        inputStack.push(currentinput);
      }
    }
    this.setState({
      completeInput: input,
      currentInput: currentinput,
      inputStack
    });
  };

  handleClearInput = () => {
    this.setState({ completeInput: "", currentInput: "", inputStack: [] });
  };

  handleOperations = (type) => {
    if (!this.state.completeInput && type !== "number") {
      // check *-+?/ case 2
      return;
    } else if (this.checkPeek()) {
      // multiple 99 add add in input stack case 4
      // case 9 if 99 add,  then multiply comes, replace add
      let inputStack = [...this.state.inputStack];
      inputStack.pop();
      inputStack.push(type);
      this.setState({ inputStack });
      return;
    }
    let inputStack = [...this.state.inputStack];
    inputStack.push(type);
    this.setState({ inputStack, currentInput: "" });
  };

  handleCalculate = () => {
    const continueCalulate = this.checkInputStack(); // to check 9* case 1
    if (!continueCalulate || this.state.inputStack.length < 3) {
      // case 7 if array has less than 3 value
      return;
    }
    let inputStack = [...this.state.inputStack];
    let count = 1;
    let result = 0;
    while (inputStack.length > 0) {
      let v1 = result;
      let v2 = 0;
      let operand = "";
      if (count === 1) {
        v1 = parseFloat(inputStack.shift());
        operand = inputStack.shift();
        v2 = parseFloat(inputStack.shift());
      } else {
        operand = inputStack.shift();
        v2 = parseFloat(inputStack.shift());
      }
      if (operand === "add") {
        result = v1 + v2;
      } else if (operand === "subtract") {
        result = v1 - v2;
      } else if (operand === "multiply") {
        result = v1 * v2;
      } else if (operand === "divide") {
        result = v1 / v2;
      }
      count++;
    }
    let newInputStack = [];
    console.log(result);
    newInputStack.push(result.toString());
    this.setState({
      completeInput: result.toString(),
      currentInput: result.toString(),
      inputStack: newInputStack
    });
    this.calculteButtonClicked = true;
  };

  heandleInputStack = (currentInput) => {
    let inputStack = [...this.state.inputStack];
    if (inputStack.length === 0) {
      inputStack.push(currentInput);
      this.setState({ inputStack });
      return;
    } else {
      if (this.checkPeek()) {
        inputStack.push(currentInput);
        this.setState({ inputStack });
        return;
      }
      inputStack.pop();
      inputStack.push(currentInput);
      this.setState({ inputStack });
    }
  };

  checkPeek = () => {
    const inpStack = this.state.inputStack;
    const peek = inpStack[inpStack.length - 1];
    if (
      peek === "multiply" ||
      peek === "divide" ||
      peek === "add" ||
      peek === "subtract"
    ) {
      return true;
    }
    return false;
  };

  checkInputStack = () => {
    const { inputStack } = this.state;
    if (inputStack.length === 0) {
      return false;
    } else {
      const peek = inputStack[inputStack.length - 1];
      if (
        peek === "multiply" ||
        peek === "divide" ||
        peek === "add" ||
        peek === "subtract"
      ) {
        return false;
      }
      return true;
    }
  };

  render() {
    const { completeInput, currentInput, inputStack } = this.state;
    console.log(completeInput, currentInput, inputStack);
    return (
      <Calclator
        completeInput={this.state.completeInput}
        onOperation={this.handleOperations}
        onInputChange={this.handleInputChange}
        onClearInput={this.handleClearInput}
        onCalculate={this.handleCalculate}
        onBackspace={this.handleBackspace}
      />
    );
  }
}

export default Main;
