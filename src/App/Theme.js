import { createMuiTheme } from "@material-ui/core/styles";

//const myBlue = "#20358a";
const myWhite = "#FFFFFF";
const myGreen = "#3a8a74";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Open Sans",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    common: {
      blue: `${myWhite}`,
      green: `${myGreen}`,
    },
    primary: { main: `${myGreen}` },
    secondary: { main: `${myWhite}` },
  },
});

export default theme;
