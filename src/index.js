import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { Provider } from "react-redux";
import setupStore from "./storeSetup";

/*ReactDOM.render(
  <Provider store={setupStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
