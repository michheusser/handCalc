import React from "react";
import HeaderUI from "../Header/HeaderComponent.js";
import FooterUI from "../Footer/FooterComponent.js";
import GridUI from "../Grid/GridComponent.js";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../Theme";
import { connect } from "react-redux";

class LayoutUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <HeaderUI />
        <GridUI />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutUI);
