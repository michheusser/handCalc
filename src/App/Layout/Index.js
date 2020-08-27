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
// Actions
import { windowResize } from "./Actions.js";
// Components
import Header from "./Header/Index.js";
import Footer from "./Footer/Index.js";
import DrawBoard from "./DrawBoard/Index.js";
import ResultPane from "./ResultPane/Index.js";
import Instructions from "./Instructions/Index.js";
import About from "./About/Index.js";

// **************************** COMPONENT ****************************
class Layout extends React.Component {
  // Sets the overall layout of the main components
  componentDidMount() {
    // Sets the event listeners when the window is resized and dispatches the action of
    // the window resize
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }
  componentWillUnmount() {
    // Removes the event listener once the component is unmounted to avoid errors / memory leaks
    window.removeEventListener(
      "resize",
      this.updateWindowDimensions.bind(this)
    );
  }
  updateWindowDimensions() {
    // Dispatches the action to resize the window and update the layout reducer
    this.props.updateDimensions(window.innerWidth, window.innerHeight);
  }
  render() {
    return (
      <React.Fragment>
        <Instructions />
        <About />
        <ResultPane />
        <Header />
        <DrawBoard />
        <Footer />
      </React.Fragment>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateDimensions: (width, height) => dispatch(windowResize(width, height)),
  };
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
