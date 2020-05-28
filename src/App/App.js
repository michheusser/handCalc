// Libraries
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Grid, Segment } from "semantic-ui-react";
// Components
import "./App.css";
import HeaderUI from "./Header/HeaderComponent";
import GridUI from "./Grid/GridComponent";
import AnalysisPaneUI from "./AnalysisPane/AnalysisPaneComponent";
import SegmentListUI from "./SegmentList/SegmentListComponent";

function App() {
  return (
    <div
      style={{
        padding: "0",
        margin: "0",
      }}
    >
      <LayoutUI />
    </div>
  );
}

class LayoutUI extends React.Component {
  render() {
    return (
      <Grid
        celled="internally"
        style={{
          margin: "1vh",
          padding: "0",
          height: "98vh",
        }}
      >
        <Grid.Row
          style={{
            height: "10%",
          }}
        >
          <Grid.Column width={16}>
            <Segment
              raised
              style={{
                height: "100%",
              }}
            >
              {" "}
              <HeaderUI />{" "}
            </Segment>{" "}
          </Grid.Column>{" "}
        </Grid.Row>
        <Grid.Row
          style={{
            height: "65%",
          }}
        >
          <Grid.Column width={16}>
            <div
              style={{
                height: "100%",
                padding: "0",
              }}
            >
              {" "}
              <GridUI />{" "}
            </div>{" "}
          </Grid.Column>{" "}
        </Grid.Row>
        <Grid.Row
          style={{
            height: "25%",
          }}
        >
          <Grid.Column width={8}>
            <Segment
              raised
              style={{
                height: "100%",
              }}
            >
              {" "}
              <SegmentListUI />{" "}
            </Segment>{" "}
          </Grid.Column>{" "}
          <Grid.Column width={8}>
            <Segment
              raised
              style={{
                height: "100%",
              }}
            >
              {" "}
              <AnalysisPaneUI />{" "}
            </Segment>
          </Grid.Column>{" "}
        </Grid.Row>{" "}
      </Grid>
      //<TrainingToolbarUI/>
    );
  }
}

export default App;
