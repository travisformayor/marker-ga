import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import AxiosModel from '../../models/axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

const App = (props) => {
  // Hooks
  const [ errors, setErrors ] = useState([]);
  const [ userInfo, setUserInfo ] = useState({
    loggedIn: false,
    user: {},
  })

  const getProfile = async () => {
    // console.log('token in localstore: ', localStorage.token)
    if (localStorage.token) {
      try {
        const response = await AxiosModel.getProfile(localStorage.token);
        // console.log('Token check went through', response.data);
        const { foundUser } = response.data
        setUserInfo({
          loggedIn: true,
          user: foundUser
        });
        // console.log('user state here:', userInfo)
      } catch(err) {
        // console.log('err.response');
        // setErrors(err.response.data.errors);
        setErrors(err.response.data.errors);
      }
    }
  }

  const logOut = () => {
    setUserInfo({
      loggedIn: false,
      user: {}
    })
    localStorage.clear();
    props.history.push('/');
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <CssBaseline />
      <Header userInfo={userInfo} logOut={logOut} getProfile={getProfile} />
      <main>
        {errors.map((error, index) => (
          <Error message={error.message} status={'error'} key={'root-error'+index} />
        ))}
        <Switch>
          <Route path="/profile" render={() => <Profile user={userInfo.user} /> } />
        </Switch>
      </main>
    </>
  );
}

export default withRouter(App);