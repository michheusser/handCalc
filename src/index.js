/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** IMPORTS ****************************
// React (Core)
import React from "react";
import ReactDOM from "react-dom";
// Redux (State Management)
import { Provider } from "react-redux";
// Components
import App from "./App/Index";
// Diverse
import setupStore from "./storeSetup";

// **************************** RENDERING ****************************
ReactDOM.render(
  <Provider store={setupStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/*ReactDOM.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
*/
