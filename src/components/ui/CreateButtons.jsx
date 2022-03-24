import React, { Component } from "react";

class CreateButton extends Component {
  handleClick = () => {
    const type = this.props.type;
    if (type === "number" || type === "decimal") {
      this.props.onInputChange(this.props.symbol, this.props.type);
    } else if (
      type === "add" ||
      type === "subtract" ||
      type === "divide" ||
      type === "multiply"
    ) {
      this.props.onInputChange(this.props.symbol, this.props.type);
      this.props.onOperation(type);
    } else if (type === "backspace") {
      this.props.onBackspace();
    } else if (type === "clear") {
      this.props.onClearInput();
    } else if (type === "calculate") {
      this.props.onCalculate();
    }
  };

  handleButtonClass = () => {
    const type = this.props.type;
    if (type === "number" || type === "decimal") {
      return "btn btn-light buttonWidth";
    } else if (type === "calculate") {
      return "btn btn-success buttonWidth";
    } else if (type === "clear") {
      return "btn btn-danger buttonWidth";
    } else if (type === "backspace") {
      return "btn btn-dark buttonWidth";
    } else {
      return "btn btn-primary buttonWidth";
    }
  };
  render() {
    const style = this.handleButtonClass();
    return (
      <button type="button" className={style} onClick={this.handleClick}>
        {this.props.symbol}
      </button>
    );
  }
}

export default CreateButton;
