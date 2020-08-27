import { createStore, combineReducers } from "redux";

import drawBoardReducer from "./App/Layout/DrawBoard/Reducer";
import resultPaneReducer from "./App/Layout/ResultPane/Reducer";
import layoutReducer from "./App/Layout/Reducer";
import headerReducer from "./App/Layout/Header/Reducer.js";
import footerReducer from "./App/Layout/Footer/Reducer.js";
import instructionsReducer from "./App/Layout/Instructions/Reducer.js";
import aboutReducer from "./App/Layout/About/Reducer.js";

// Define the Reducers that will always be present in the application
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
