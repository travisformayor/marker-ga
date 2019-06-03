import React from 'react';
import Header from './components/Header/Header';
import TestContainer from './components/test';
import CssBaseline from '@material-ui/core/CssBaseline';
// import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <h1>Test</h1>
      <TestContainer />
    </>
  );
}

export default App;