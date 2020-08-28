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
import fill from "../../../../Assets/Media/fill.gif";
import seven from "../../../../Assets/Media/7.gif";
import one from "../../../../Assets/Media/1.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Extra extends React.Component {
  // Displays the tutorial part explaining extra advice around usage. There are no functional
  // components, only text and images
  render() {
    //  const { classes } = this.props;

    return (
      <Card elevation={0}>
        <CardContent>
          <Typography component="span" variant="h4" gutterBottom>
            Important Extras
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            Please make sure you read through the following important
            considerations when using the application
            <br />
          </Typography>
          <Typography component="span" variant="body2" gutterBottom>
            The size and amount of fields available for you to write depends on
            the size and proportions of your browser window. Everytime you
            resize your window, the drawing board gets recalculated and
            re-rendered. Before you start writing, make sure you are comfortable
            with the proportions and you have enough pixels available for you to
            write the expression you have in mind.
            <br />
          </Typography>
          <Typography component="span" variant="body2" gutterBottom>
            All connected pixels are agglomerated and cut as indepenent symbol
            segments, so make sure that all of the parts of a symbol are
            touching each other.
            <br />
          </Typography>
          <img src={fill} height={100} alt="Fill GIF" />
          <Typography component="span" variant="body2">
            <br />
            Make sure you write the symbols in a way that identifies them best
            from similar ones, where the neural network is more prone confuse
            them (e.g. always crossing the "7", not forgetting the head of a
            "1", not forgetting the square head and tail of the square brackets
            "[" and "]")
            <br />
          </Typography>
          <img src={seven} height={100} alt="Seven GIF" />{" "}
          <img src={one} height={100} alt="One GIF" />
          <Typography component="span" variant="body2">
            <br />
            Write symbols in a size where the stroke is clearly differentiable.
            Although each symbol is processed and resized to occupy a 28 by 28
            grid, there might not be enough information in a small stroke for
            the neural network to clearly identify the symbol
            <br />
          </Typography>
          <Typography component="span" variant="body2" gutterBottom>
            <br />
            If you don't have enough horizontal space to write your whole
            expression, feel free to use the whole drawing pane. The
            segmentation algorithm will process and order every sign according
            to its center of mass in horizontal direction ignoring whether some
            are higher or lower than others. <br />
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            In general, be aware that the way we understand certain handwritten
            signs may different than a neural network with a tiny fraction of
            the capacity of a human brain. In some cases it might require small
            changes in a drawing to completely change the prediction. In case a
            sign might not be recognized, go back and try to make it clearer.
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
)(withStyles(useStyles)(Extra));