import { createStore, combineReducers } from "redux";
import gridReducer from "./App/Grid/GridReducer";
import appReducer from "./App/AppReducer";
import segmentListReducer from "./App/SegmentList/SegmentListReducer";
import analysisPaneReducer from "./App/AnalysisPane/AnalysisPaneReducer";

// Define the Reducers that will always be present in the application
const initialReducers = {
  gridReducer: gridReducer,
  appReducer: appReducer,
  segmentListReducer: segmentListReducer,
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
