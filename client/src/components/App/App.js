import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Header from '../Header/Header';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';
import Profile from '../Profile/Profile';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <h1>Test</h1>
      {/* <Signup />
      <Login /> */}
      <Logout />
      {/* <Link to={`/post/${post._id}`}>{post.title}</Link> */}
      {/* <Profile /> */}

			{/* <NavBar isLoggedIn={isLoggedIn} user={user} /> */}
      <main>
        <Link to='/'>Home</Link>
        <Switch>
          <Route path="/signup" render={() => <Signup /> } />
          <Route path="/login" render={() => <Login /> } />
          <Route path="/profile" render={() => <Profile /> } />
          {/* <Route path="/logout" render={props => {
            return (
              <LogOut isLoggedIn={isLoggedIn} handleLogOut={this.handleLogOut} />
            );
          }} /> */}
        </Switch>
      </main>
    </>
  );
}

export default App;