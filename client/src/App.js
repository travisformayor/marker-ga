import React from 'react';
import Header from './components/Header/Header';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Profile from './components/Profile/Profile';
import CssBaseline from '@material-ui/core/CssBaseline';
// import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <h1>Test</h1>
      <Signup />
      <Login />
      <Logout />
      <Profile />
    </>
  );
}

export default App;