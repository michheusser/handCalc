import React from "react";
import HeaderUI from "../Header/HeaderComponent.js";
//import FooterUI from "../Footer/FooterComponent.js";
import GridUI from "../Grid/GridComponent.js";
import ResultPaneUI from "../ResultPane/ResultPaneComponent.js";
//import LoadingBarUI from "../Grid/LoadingBarComponent.js";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../Theme";
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
      <ThemeProvider theme={theme}>
        <ResultPaneUI />
        <HeaderUI />
        <GridUI />
      </ThemeProvider>
    );
  }
}
/*<LoadingBarUI />
 */
const mapStateToProps = (state) => {
  return {
    width: state.layoutReducer.width,
    height: state.layoutReducer.height,
    widthFields: state.layoutReducer.widthFields,
    heightFields: state.layoutReducer.heightFields,
    fieldSize: state.layoutReducer.fieldSize,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateDimensions: (width, height) => dispatch(windowResize(width, height)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutUI);