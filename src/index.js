import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
// Reducers:
import gridReducer from "./App/Grid/GridReducer";
import appReducer from "./App/AppReducer";
import segmentListReducer from "./App/SegmentList/SegmentListReducer";

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStore(
        combineReducers({ gridReducer, appReducer, segmentListReducer })
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
