import { createMuiTheme } from "@material-ui/core/styles";

const myBlue = "#20358a";
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
      blue: `${myBlue}`,
      green: `${myGreen}`,
    },
    primary: { main: `${myBlue}` },
    secondary: { main: `${myGreen}` },
  },
});

export default theme;
