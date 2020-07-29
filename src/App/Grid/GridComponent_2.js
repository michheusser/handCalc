// Libraries
import React from "react";
import { connect } from "react-redux";
import FieldUI from "./Field/FieldComponent";
import { Box, Typography } from "@material-ui/core/";

class GridUI extends React.Component {
  render() {
    return <Box>Hello World</Box>;
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GridUI);
