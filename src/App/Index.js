/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** IMPORTS ****************************
// React (Core)
import React from "react";
// Redux (State Management)
import { connect } from "react-redux";
// Components
import Layout from "./Layout/Index";
// Material UI (Design)
import { ThemeProvider } from "@material-ui/core/styles";
// Diverse
import theme from "./Theme";

// **************************** COMPONENT ****************************
class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(mapStateToProps, mapDispatchToProps)(App);
