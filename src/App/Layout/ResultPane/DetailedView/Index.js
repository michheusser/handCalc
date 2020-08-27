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
// Components
import AnalysisPane from "./AnalysisPane/Index.js";
// Material UI (Components)
import { Accordion, AccordionDetails, Typography } from "@material-ui/core";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
const AccordionSummary = withStyles({
  root: {
    flexDirection: "column",
    margin: 0,
    padding: 0,
  },

  content: {
    margin: 0,
    padding: 0,
  },
  expandIcon: {
    margin: 0,
    padding: 0,
  },
})(MuiAccordionSummary);

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  accordionDetails: {
    padding: theme.spacing(0),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

// **************************** COMPONENT ****************************
class DetailedView extends React.Component {
  // Renders the accordion showing the predicted result upon drawing that can be expanded to
  // display the details of the predictions
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Accordion variant="elevation" elevation={0}>
          <AccordionSummary
            className={classes.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h3">{this.props.result}</Typography>
          </AccordionSummary>

          <AccordionDetails className={classes.accordionDetails}>
            <AnalysisPane />
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return { result: state.drawBoardReducer.displayedResult };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DetailedView));
