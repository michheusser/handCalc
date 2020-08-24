import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import happy from "../Media/happy.gif";
//
const useStyles = (theme) => ({});

class EndUI extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <Card elevation={0}>
        <CardContent>
          <Typography component="span" variant="h4" gutterBottom>
            Tutorial Finished!
            <br />
          </Typography>

          <img src={happy} height={250} alt="Happy Writing GIF" />
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
)(withStyles(useStyles)(EndUI));
