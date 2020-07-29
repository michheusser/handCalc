import { createStore, combineReducers } from "redux";
import gridReducer from "./App/Grid/GridReducer";
import appReducer from "./App/AppReducer";
import resultPaneReducer from "./App/ResultPane/ResultPaneReducer";
import analysisPaneReducer from "./App/AnalysisPane/AnalysisPaneReducer";
import predictorReducer from "./App/Predictor/PredictorReducer";
import layoutReducer from "./App/Layout/LayoutReducer";
import headerReducer from "./App/Header/HeaderReducer";

// Define the Reducers that will always be present in the application
const initialReducers = {
  gridReducer: gridReducer,
  appReducer: appReducer,
  resultPaneReducer: resultPaneReducer,
  analysisPaneReducer: analysisPaneReducer,
  predictorReducer: predictorReducer,
  layoutReducer: layoutReducer,
  headerReducer: headerReducer,
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
