import React from "react";
import ToolbarUI from "./Toolbar/ToolbarComponent.js";
import FooterUI from "./Footer/FooterComponent.js";
import GridUI from "./Grid/GridComponent.js";
import ResultPaneUI from "./ResultPane/ResultPaneComponent.js";
import InstructionsUI from "./Instructions/InstructionsComponent.js";
import AboutUI from "./About/AboutComponent.js";
import { connect } from "react-redux";
import { windowResize } from "./LayoutActions.js";

class LayoutUI extends React.Component {
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
        <InstructionsUI />
        <AboutUI />
        <ResultPaneUI />
        <ToolbarUI />
        <GridUI />
        <FooterUI />
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

export default connect(mapStateToProps, mapDispatchToProps)(LayoutUI);
