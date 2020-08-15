import { createStore, combineReducers } from "redux";

/*import appReducer from "./App/AppReducer";
import resultPaneReducer from "./App/Layout/ResultPane/ResultPaneReducer";
import analysisPaneReducer from "./App/Layout/ResultPane/DetailedView/AnalysisPane/AnalysisPaneReducer";
import layoutReducer from "./App/Layout/LayoutReducer";
import headerReducer from "./App/Layout/Header/HeaderReducer";
import segmentDetailsReducer from "./App/Layout/ResultPane/DetailedView/AnalysisPane/SegmentDetails/SegmentDetailsReducer.js";*/

import resultPaneReducer from "./App/Reducers/ResultPaneReducer";
import analysisPaneReducer from "./App/Reducers/AnalysisPaneReducer";
import layoutReducer from "./App/Reducers/LayoutReducer";
import headerReducer from "./App/Reducers/HeaderReducer";
import segmentDetailsReducer from "./App/Reducers/SegmentDetailsReducer.js";

// Define the Reducers that will always be present in the application
const initialReducers = {
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
