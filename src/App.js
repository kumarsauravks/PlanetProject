import logo from './logo.svg';
import './App.css';
import List from './components/List';
import { useState,useEffect } from 'react';

function App() {
  const[display,setDisplay]=useState(true);

  return (
    <div className="App">
      <div className="icon" onClick={()=>{setDisplay(!display)}}>
        <img src={display?"/assets/checklist.png":"/assets/favourite1.png"} />
      </div>
      <div style={display?{display:"block"}:{display:"none"}}>
        <List view={display?"listView":"favView"} title="List of Planets" listTitle="Click and Add to Favourite" />
      </div>
      <div style={!display?{display:"block"}:{display:"none"}}>
        <List view={display?"listView":"favView"} title="Favourite Planets" listTitle="Your Favourite List"/>
      </div>
    </div>
  );
}

export default App;
