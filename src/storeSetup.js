import { createStore, combineReducers } from "redux";
//import gridReducer from "./App//Layout/Grid/GridReducer";
import appReducer from "./App/AppReducer";
import resultPaneReducer from "./App/Layout/ResultPane/ResultPaneReducer";
import analysisPaneReducer from "./App/Layout/ResultPane/DetailedView/AnalysisPane/AnalysisPaneReducer";
//import predictorReducer from "./App/Predictor/PredictorReducer";
import layoutReducer from "./App/Layout/LayoutReducer";
import headerReducer from "./App/Layout/Header/HeaderReducer";
import segmentDetailsReducer from "./App/Layout/ResultPane/DetailedView/AnalysisPane/SegmentDetails/SegmentDetailsReducer.js";

// Define the Reducers that will always be present in the application
const initialReducers = {
  appReducer: appReducer,
  resultPaneReducer: resultPaneReducer,
  analysisPaneReducer: analysisPaneReducer,
  segmentDetailsReducer: segmentDetailsReducer,
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
