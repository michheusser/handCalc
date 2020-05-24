import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
// Reducers:
import gridReducer from "./Grid/GridReducer";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(gridReducer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
