import React from 'react';
import './App.css';
import RomanCalculator from './components/RomanCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo192.png'} className="App-logo" alt="logo" />
      </header>

      <main className='Main'>
        <RomanCalculator />
      </main>
    </div>
  );
}

export default App;
