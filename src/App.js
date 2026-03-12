import React from 'react'
import Weather from './components/Weather'
import Advice from './components/Advice'
import './App.css'

const App = () => {
  return (
    <div className="container">
      <h1 className="App-title">🌎Weather & Advice</h1>
      <Weather />
      <Advice />
    </div>
  );
}

export default App