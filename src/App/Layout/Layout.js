import React from "react";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import DrawBoard from "./DrawBoard/DrawBoard.js";
import ResultPane from "./ResultPane/ResultPane.js";
import Instructions from "./Instructions/Instructions.js";
import About from "./About/About.js";
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
