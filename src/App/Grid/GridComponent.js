// Libraries
import React from "react";
//import { connect } from "react-redux";
// Actions
import FieldUI from "./Components/FieldComponent";

class GridUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.activeFields = [];
  }
  fieldClicked(x, y, active) {
    if (active) {
      if (!this.activeFields.find((field) => field === [x, y])) {
        this.activeFields.push([x, y]);
      }
    } else {
      this.activeFields = this.activeFields.filter(
        (field) => !(field[0] === x && field[1] === y)
      );
    }
    //console.log(this.activeFields);
  }

  render() {
    let [xFields, yFields] = [111, 44];
    let fieldBorder = 1;
    let fieldSize = 10;
    let table = [];
    for (let j = 0; j < yFields; j++) {
      table.push(
        <tr key={j}>
          {new Array(xFields).fill(null).map((_, index) => {
            return (
              <FieldUI
                key={`ID${j}&${index}`}
                fieldSize={fieldSize}
                border={fieldBorder}
                x={index}
                y={j}
                backgroundActivated={"grey"}
                background={"white"}
                fieldClicked={this.fieldClicked.bind(this)}
              />
            );
          })}
        </tr>
      );
    }
    return (
      <div style={{ padding: "0", margin: "0", overflow: "hidden" }}>
        <table
          style={{
            borderCollapse: "collapse",
            tableLayout: "fixed",
            margin: "0",
            padding: "0",
            position: "relative",
          }}
        >
          <tbody>{table}</tbody>
        </table>
      </div>
    );
  }
}

export default GridUI;
