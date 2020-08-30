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
// Material UI (Components)
import { Typography, Card, CardContent } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";
// Diverse
import analysis_pane from "../../../../Assets/Media/analysis.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane8 extends React.Component {
  // Displays the tutorial part explaining the analysis pane. There are no functional components,
  // only text and images
  render() {
    //  const { classes } = this.props;
    return (
      <Card elevation={0}>
        <CardContent>
          <Typography component="span" variant="h4" gutterBottom>
            Pane 1
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            Pane 1 Lorem ipsum
            <br />
          </Typography>
          <img src={analysis_pane} height={100} alt="Analysis Pane GIF" />
          <Typography component="span" variant="body2">
            <br />
            Pane1 lorem ipsum
            <br />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Pane8));
