/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import React from "react";
import Header from "./Header/Index.js";
import Footer from "./Footer/Index.js";
import DrawBoard from "./DrawBoard/Index.js";
import ResultPane from "./ResultPane/Index.js";
import Instructions from "./Instructions/Index.js";
import About from "./About/Index.js";
import { connect } from "react-redux";
import { windowResize } from "./Actions.js";

class Layout extends React.Component {
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      this.updateWindowDimensions.bind(this)
    );
  }
  updateWindowDimensions() {
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

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateDimensions: (width, height) => dispatch(windowResize(width, height)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
