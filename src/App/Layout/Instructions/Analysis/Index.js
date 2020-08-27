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
import segments from "../../../../Assets/Media/segments.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Analysis extends React.Component {
  // Displays the tutorial part explaining the analysis pane. There are no functional components,
  // only text and images
  render() {
    //  const { classes } = this.props;
    return (
      <Card elevation={0}>
        <CardContent>
          <Typography component="span" variant="h4" gutterBottom>
            Analysis
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            The analysis pane will show you the evaluated result of the
            expression identified and will show you the results rendered by the
            neural network prediction
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            Once you have evaluated your handwritten expression, you can access
            the detailed analysis information by clicking on the arrow below the
            evaluated expression <br />
          </Typography>
          <img src={analysis_pane} height={100} alt="Analysis Pane GIF" />
          <Typography component="span" variant="body2">
            <br />
            Everytime you write a new expression, every symbol is segmented, and
            processed to fit the input dimensions of the pre-trained neural
            network that recognizes symbols. By clicking on the different
            segments you can get a detailed prediction view for each of them
            <br />
          </Typography>
          <img src={segments} height={100} alt="Segments GIF" />
          <Typography component="span" variant="body2">
            <br />
            Every neural network has its limitations, and may not always
            recognize a specific symbol or confuse it with a different one. In
            one or more of your handwritten symbols were not correctly
            recognized, you can use the analysis pane to infer the type of
            confusion by checking the original size of the symbol, or by seeing
            if there are other prediction candidates with similar likelihood
            (graph).
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
)(withStyles(useStyles)(Analysis));
