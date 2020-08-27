/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

//
import Accordion from "@material-ui/core/Accordion";
//import AccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AnalysisPane from "./AnalysisPane/Index.js";

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

class DetailedView extends React.Component {
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

const mapStateToProps = (state) => {
  return { result: state.drawBoardReducer.displayedResult };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DetailedView));

//<SymbolList />
