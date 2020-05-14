import React from 'react';
import logo from './logo.svg';
import './App.css';

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
      <Grid/>
    );
  }
}

class Grid extends React.Component
{
  render()
  {
    return null;
  }
}



export default App;
