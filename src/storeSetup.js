import { createStore, combineReducers } from "redux";

import gridProcessorReducer from "./App/Reducers/GridProcessorReducer";
import analysisPaneReducer from "./App/Reducers/AnalysisPaneReducer";
import gridLayoutReducer from "./App/Reducers/GridLayoutReducer";
import headerReducer from "./App/Reducers/HeaderReducer";
import headerFooterReducer from "./App/Reducers/HeaderFooterReducer.js";

// Define the Reducers that will always be present in the application
const initialReducers = {
  headerFooterReducer: headerFooterReducer,
  headerReducer: headerReducer,
  gridLayoutReducer: gridLayoutReducer,
  gridProcessorReducer: gridProcessorReducer,
  analysisPaneReducer: analysisPaneReducer,
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
