/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import analysis_pane from "../Media/analysis.gif";
import segments from "../Media/segments.gif";
//
const useStyles = (theme) => ({});

class Analysis extends React.Component {
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Analysis));
