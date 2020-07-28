import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function FooterUI() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="caption">
          All rights reserved. Michel Heusser, 2020
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default FooterUI;
