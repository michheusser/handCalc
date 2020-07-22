import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Segment, TransitionablePortal } from "semantic-ui-react";
import ResultPaneUI from "./ResultPaneComponent";
class TransitionablePortalExampleTransition extends Component {
  state = { animation: "fade down", duration: 500 };
  render() {
    const { animation, duration } = this.state;
    const open = this.props.open;
    return (
      <Grid columns={2}>
        {" "}
        <Grid.Column>
          {" "}
          <TransitionablePortal
            open={open}
            transition={{ animation, duration }}
          >
            {" "}
            <Segment
              style={{
                left: "40%",
                position: "fixed",
                top: "50%",
                zIndex: 1000,
              }}
            >
              {" "}
              <ResultPaneUI />{" "}
            </Segment>{" "}
          </TransitionablePortal>{" "}
        </Grid.Column>{" "}
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    open: state.resultPaneReducer.paneOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransitionablePortalExampleTransition);
