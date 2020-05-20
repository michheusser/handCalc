import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Grid, Segment } from 'semantic-ui-react'

function App()
{
  return(
    <div style={{padding: '0', margin: '0'}}>
      <LayoutUI/>
    </div>
  );
}

class LayoutUI extends React.Component
{
  render()
  {
    /*let headerHeight = , headerWidth;
    let gridHeight = , gridWidth;
    let segmentListHeight = , let segmentListWidth
    let analysisPaneHeight = let analysisPaneWidth
*/

    return(
      <Grid celled = "internally" style={{margin: '1vh', padding: '0', height: '98vh'}}>
        <Grid.Row style={{height: '10%'}}>
          <Grid.Column width={16}>
            <Segment raised style={{height: '100%'}}><HeaderUI/></Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{height: '65%'}}>
          <Grid.Column width={14}>
            <div style={{height: '100%',padding: '0'}}><GridUI/></div>
          </Grid.Column>
          <Grid.Column width={2}>
            <Segment raised style={{height: '100%'}}><GridToolbarUI/></Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{height: '25%'}}>
          <Grid.Column width={8}>
            <Segment raised style={{height: '100%'}}><SegmentListUI/></Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment raised style={{height: '100%'}}><AnalysisPaneUI/></Segment>

          </Grid.Column>
        </Grid.Row>
      </Grid>
      //<TrainingToolbarUI/>
    );
  }
}

class HeaderUI extends React.Component
{
  render()
  {
    return (<div>
      <div style={{padding: '0', display: 'inline-block'}}>Symbol Neural Network</div>
    </div>)
  }
}

class GridUI extends React.Component
{
  render()
  {
    let xFields = 111
    let yFields = 44
    let fieldBorder = 1;
    let fieldSize = 10;

    let table = [];
    for(let j=0; j<yFields;j++){
      table.push(<tr>{new Array(xFields).fill(<FieldUI fieldSize={fieldSize} border={fieldBorder}/>)}</tr>)
    }
    return <div style={{padding: '0', margin:'0' , overflow: 'hidden'}}><table style={{borderCollapse: 'collapse', tableLayout: 'fixed', margin: '0', padding: '0', position:'relative'}}>{table}</table></div>;
  }
}
class FieldUI extends React.Component
{
  render()
  {
    let styleCell = {border: `${this.props.border}px solid lightblue`, padding: '0' }
    let styleSquare = {height: `${this.props.fieldSize}px`, width: `${this.props.fieldSize}px`, background: 'white', border: 'none', padding: '0', margin: '0'}
    return <td style={styleCell}><div style={styleSquare}></div></td>;
  }
}


class GridToolbarUI extends React.Component
{
  render()
  {
    return <div>GT</div>
  }
}

class SegmentListUI extends React.Component
{
  render()
  {

    return <div>Segment List</div>;
  }
}

class AnalysisPaneUI extends React.Component
{
  render()
  {
    return <div>Analysis Pane</div>;
  }
}

class TrainingToolbarUI extends React.Component
{
  render()
  {
    return <div>Training Toolbar</div>
  }
}



export default App;
