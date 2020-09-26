import React from 'react';
import './App.css';
import Main from './Component/Main';
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
