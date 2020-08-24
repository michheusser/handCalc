import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import writing_big from "../Media/writing_big.gif";

//
const useStyles = (theme) => ({});

class IntroductionUI extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <Card elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4" gutterBottom>
            Welcome to handCalc!
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            This short tutorial will walk you through all features of this
            application.
            <br />
          </Typography>

          <Typography component="span" variant="body2">
            handCalc is a simple machine-learning-based educational tool to
            write easy numerical mathematical expressions by hand and get them
            evaluated. ...
            <br />
            <br />
          </Typography>
          <img src={writing_big} height={200} alt="Writing GIF (big)" />
          <Typography component="span" variant="body2">
            <br />
            If you want to dive right in, feel free to press the "Skip Tutorial"
            button below. Otherwise, press "Next"!
            <br />
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            IMPORTANT: This web-app is currently not yet adapted for mobile
            browsers. So please make sure you're using it on Google Chrome,
            Firefox, or Safari for MacOS or Windows
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
)(withStyles(useStyles)(IntroductionUI));
