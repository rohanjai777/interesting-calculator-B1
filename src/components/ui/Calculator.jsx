import React, { Component } from "react";
import CreateButton from "./CreateButtons";

class Calclator extends Component {
  render() {
    const inputValue =
      this.props.completeInput === "" ? 0 : this.props.completeInput;
    return (
      <div className="calculator-size">
        <input
          className="form-control input-field"
          type="text"
          placeholder="Enter number"
          dir="ltr"
          value={inputValue}
          disabled
        />
        <div className="border">
          <table>
            <tbody>
              <tr>
                <td>
                  <CreateButton
                    symbol="+"
                    type="add"
                    onOperation={this.props.onOperation}
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="-"
                    type="subtract"
                    onOperation={this.props.onOperation}
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="&times;"
                    type="multiply"
                    onOperation={this.props.onOperation}
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="&divide;"
                    type="divide"
                    onOperation={this.props.onOperation}
                    onInputChange={this.props.onInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <CreateButton
                    symbol="7"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="8"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="9"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="&#9003;"
                    type="backspace"
                    onBackspace={this.props.onBackspace}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <CreateButton
                    symbol="4"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="5"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="6"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="="
                    type="calculate"
                    onInputChange={this.props.onInputChange}
                    onCalculate={this.props.onCalculate}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <CreateButton
                    symbol="1"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="2"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="3"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <CreateButton
                    symbol="0"
                    type="number"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="."
                    type="decimal"
                    onInputChange={this.props.onInputChange}
                  />
                </td>
                <td>
                  <CreateButton
                    symbol="AC"
                    type="clear"
                    onClearInput={this.props.onClearInput}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Calclator;