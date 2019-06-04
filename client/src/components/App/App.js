import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';
import Profile from '../Profile/Profile';
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

			{/* <NavBar isLoggedIn={isLoggedIn} user={user} /> */}
      <main>
        <Switch>
          <Route path="/signup" render={props => <Signup /> } />
          {/* <Route
            path="/logout"
            render={props => {
              return (
                <LogOut
                  isLoggedIn={isLoggedIn}
                  handleLogOut={this.handleLogOut}
                />
              );
            }}
          />
          <Route
            path="/login"
            render={props => {
              return (
                <LogInForm
                  isLoggedIn={isLoggedIn}
                  handleInput={this.handleInput}
                  handleLogIn={this.handleLogIn}
                />
              );
            }}
          />
          <Route
            path="/profile"
            render={props => {
              return <Profile isLoggedIn={isLoggedIn} user={user} />;
            }}
          />
          <Route
            path="/"
            render={() => {
              return <DogList isLoggedIn={isLoggedIn} />;
            }}
          /> */}
        </Switch>
      </main>
    </>
  );
}

export default App;