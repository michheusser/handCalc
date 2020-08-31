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
import segments from "../../../../Assets/Media/segments.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane10 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the analysis pane (2/3)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Explore the details of each segment.
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            Everytime you write a new expression, every symbol is segmented, and
            processed to fit the input dimensions of the pre-trained neural
            network that recognizes symbols. By clicking on the different
            segments you can get a detailed prediction view for each of them
            <br />
            <br />
          </Typography>
          <img src={segments} height={100} alt="Segments GIF" />
          <Typography component="span" variant="body2">
            <br />
            Make sure that every part of each symbol is connected to each other,
            so it gets recognized as a single segment.
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
)(withStyles(useStyles)(Pane10));
