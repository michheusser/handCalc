import React from "react";
import LayoutUI from "./Layout/LayoutComponent.js";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme";
import { connect } from "react-redux";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LayoutUI />
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
