/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** IMPORTS ****************************
import { createStore, combineReducers } from "redux";
import drawBoardReducer from "./App/Layout/DrawBoard/Reducer";
import resultPaneReducer from "./App/Layout/ResultPane/Reducer";
import layoutReducer from "./App/Layout/Reducer";
import headerReducer from "./App/Layout/Header/Reducer.js";
import footerReducer from "./App/Layout/Footer/Reducer.js";
import instructionsReducer from "./App/Layout/Instructions/Reducer.js";
import aboutReducer from "./App/Layout/About/Reducer.js";

// **************************** REDUCER SETUP ****************************
const initialReducers = {
  headerReducer: headerReducer,
  footerReducer: footerReducer,
  layoutReducer: layoutReducer,
  drawBoardReducer: drawBoardReducer,
  resultPaneReducer: resultPaneReducer,
  instructionsReducer: instructionsReducer,
  aboutReducer: aboutReducer,
};

const setupStore = () => {
  // Sets up the store and provides a method to inject reducers dynamically to the store
  // in case it is needed
  const store = createStore(combineReducers({ ...initialReducers }));

  store.newReducers = {};

  store.injectReducer = (reducerArray) => {
    for (let i = 0; i < reducerArray.length; i++) {
      store.newReducers[reducerArray[i].key] = reducerArray[i].newReducer;
    }
    store.replaceReducer(
      combineReducers({ ...initialReducers, ...store.newReducers })
    );
  };

  return store;
};

export default setupStore;
