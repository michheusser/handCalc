import React from 'react';
import './App.css';
import {TweenMax} from 'gsap';
//import GridGenerator from './Grid.js';

function App()
{
  return(
    <div className="App">
      <header className="App-header">
        Symbol Neural Network
      </header>
      <Layout/>
    </div>
  );
}

class Layout extends React.Component
{
  render()
  {
    return(
      //<GridUI rows={5} columns={10}/>
      <TempElement/>
    );
  }
}

class TempElement extends React.Component
{
  constructor(props)
  {
    super(props);
    this.myElement = null;
    this.myTween = null;
  }
  componentDidMount()
  {
    this.myTween = TweenMax.to(this.myElement,1,{x:'100vw',y:'100vh'});
  }
  render()
  {
    let style = {height: '50px', width:'50px', background:'#AAAAFF', borderStyle: 'solid', boxSizing: 'border-box', borderWidth: '1px'}
    return <div style = {style} ref={div => this.myElement = div} />  }
}



class GridUI extends React.Component
{
  constructor(props)
  {
    super(props);
    //this.state = {grid: new GridGenerator().createGrid(props.xFields,props.yFields)
  }

  createGridStyle(gridRows, gridColumns, height, width)
  {
    let rowStyle = ''; let columnStyle = '';
    let borderWidth = '0.05vw'; let fieldSize = `calc(100vw/${gridColumns})`
    //for(let i = 0; i<gridRows;i++){rowStyle += fieldSize + ' ';}
    //for(let i = 0; i<gridColumns;i++){columnStyle += fieldSize + ' ';}
    for(let i = 0; i<gridRows;i++){rowStyle += '1fr ';}
    for(let i = 0; i<gridColumns;i++){columnStyle += '1fr ';}

    let style = {display: 'grid', gridTemplateRows: rowStyle, gridTemplateColumns: columnStyle, gridGap: '0px'}
    return [style, fieldSize, borderWidth];
  }
  render()
  {
    let [style, fieldSize, borderWidth] = this.createGridStyle(this.props.rows, this.props.columns, '50px');
    //let fields = new Array(this.props.rows*this.props.columns).fill(null).map((_,index)=><FieldUI key={index} fieldSize = {fieldSize} borderWidth = {borderWidth} background = {'#'+ (Math.floor(index*(256**3)/(this.props.rows*this.props.columns))).toString(16)}/>)
    let fields = new Array(this.props.rows*this.props.columns).fill(null).map((_,index)=><FieldUI key={index} fieldSize = {fieldSize} borderWidth = {borderWidth} background = {'#AAFFFF'}/>)
    return <div style={style}>{fields}</div>;
  }
}
 
class FieldUI extends React.Component
{
  render()
  {
    let style = {height: this.props.fieldSize, width:this.props.fieldSize, background:this.props.background, borderStyle: 'solid', boxSizing: 'border-box', borderWidth: this.props.borderWidth}
    return <div style={style} />
  }
}

export default App;
