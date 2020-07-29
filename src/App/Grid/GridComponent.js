// Libraries
import React from "react";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { processGrid, finishedProcess } from "./GridActions";
import { Box } from "@material-ui/core";
// Actions
// Components
import FieldUI from "./Field/FieldComponent";
import GridToolbarUI from "./GridToolbar/GridToolbarComponent";

class GridUI extends React.Component {
  constructor(props) {
    super(props);
    this.fields = new Array(this.props.xFields)
      .fill(null)
      .map((_) => new Array(this.props.yFields).fill(false));
  }
  componentDidUpdate() {
    console.log("[GridComponent] componentDidUpdate");
    if (this.props.goClicked) {
      this.processGrid();
    }
  }

  setFieldActive(x, y) {
    function setActive(active) {
      this.fields[x][y] = active;
    }
    return setActive;
  }
  processGrid() {
    console.log("[GridComponent] processGrid()");
    this.props.process(this.props.xFields, this.props.yFields, this.fields);
    this.props.finishedProcess();
  }

  render() {
    let table = [];
    for (let j = 0; j < this.props.yFields; j++) {
      table.push(
        <tr key={j}>
          {new Array(this.props.xFields).fill(null).map((_, index) => {
            return (
              <FieldUI
                key={`ID${j}&${index}`}
                fieldSize={this.props.fieldSize}
                border={this.props.fieldBorder}
                x={index}
                y={j}
                setFieldActive={this.setFieldActive(index, j).bind(this)}
                active={this.fields[index][j]}
                backgroundActivated={"grey"}
                background={"white"}
              />
            );
          })}
        </tr>
      );
    }
    return (
      <Box>
        <table
          style={{
            borderCollapse: "collapse",
            tableLayout: "fixed",
            margin: "0",
            padding: "0",
            position: "absolute",
          }}
        >
          <tbody>{table}</tbody>
        </table>
        <Segment
          raised
          style={{ right: "0", bottom: "0", position: "absolute" }}
        >
          {" "}
          <GridToolbarUI processGrid={this.processGrid.bind(this)} />{" "}
        </Segment>{" "}
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    xFields: state.layoutReducer.widthFields,
    yFields: state.layoutReducer.heightFields,
    fieldSize: state.layoutReducer.fieldSize,
    fieldBorder: state.layoutReducer.fieldBorder,
    goClicked: state.headerReducer.goClicked,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    process: (xFields, yFields, fields) => {
      dispatch(processGrid(xFields, yFields, fields));
    },
    finishedProcess: () => {
      dispatch(finishedProcess());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridUI);
