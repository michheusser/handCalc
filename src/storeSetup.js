import { createStore, combineReducers } from "redux";

import gridProcessorReducer from "./App/Reducers/GridProcessorReducer";
import analysisPaneReducer from "./App/Reducers/AnalysisPaneReducer";
import gridLayoutReducer from "./App/Reducers/GridLayoutReducer";
import headerFooterReducer from "./App/Reducers/HeaderFooterReducer.js";
import instructionsReducer from "./App/Reducers/InstructionsReducer.js";
import aboutReducer from "./App/Reducers/AboutReducer.js";

// Define the Reducers that will always be present in the application
const initialReducers = {
  headerFooterReducer: headerFooterReducer,
  gridLayoutReducer: gridLayoutReducer,
  gridProcessorReducer: gridProcessorReducer,
  analysisPaneReducer: analysisPaneReducer,
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
