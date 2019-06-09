import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import Nav from './Nav';
import Title from './Title';

const Header = (props) => {
  const { userInfo: { loggedIn, user: { username } }, logOut, getProfile } = props;
  const defaultTitle = {title: '404', color: '#ffa500, 30%, #f5f5dc'}
  // Hooks
  const [ auth, setAuth ] = useState(false);
  const [ prevPath, setPrevPath ] = useState('');
  const [ paths, setPaths ] = useState([]);
  const [ titleState, setTitle ] = useState({
    ...defaultTitle,
  });
 
  const navLinks = [
    {name: 'main', path: '', color: '#3f51b5, 30%, #6573c3'}, // dark blue
    {name: 'create', path: 'create', color: '#2196f3, 30%, #4dabf5'}, // lite blue
    {name: 'trade', path: 'trade', color: '#ff5722, 30%, #ff784e'}, // orange
    {name: 'artists', path: 'artists', color: '#4caf50, 30%, #6fbf73'}, // green
    {name: 'profile', path: 'profile', color: '#673ab7, 30%, #8561c5'}, // purple
  ]
  
  // Nav and Title setting methods
  const getNav = () => {
    const pathname = props.location.pathname.split('/')[1]; // ignore any trailing /pages
    if (auth) {
      // true - logged in
      const newPaths = navLinks.filter(navOption => navOption.path !== pathname);
      setPaths(newPaths); // all paths except current page
    } else {
      // false - logged out
      const newPaths = navLinks.filter(navOption => {
        return navOption.path !== pathname && navOption.path !== 'profile';
      });
      setPaths(newPaths); // all paths except current page and profile
    }
  }

  const getTitle = () => {
    // Set the title bar state
    const pathname = props.location.pathname.split('/')[1]; // ignore any trailing /pages
    const newTitle = navLinks.find(navOption => navOption.path === pathname);
    if (newTitle) {
      setTitle({
        title: newTitle.name,
        color: newTitle.color,
      })
    } else {
      // console.log('404')
      setTitle({...defaultTitle})
    }
  }

  // Use Effects
  useEffect(() => {
    // loggedIn prop changed
    // Save to state as auth
    setAuth(loggedIn);
  },[loggedIn]);

  useEffect(() => {
    // Auth state changed
    getNav()
    // eslint-disable-next-line
  },[auth])

  useEffect(() => {
    // url path changed
    getTitle();
    getNav();
    // eslint-disable-next-line
  },[props.location.pathname]);

  return (
    <>
      <Title 
        username={username}
        logOut={logOut}
        getProfile={getProfile}
        auth={auth}
        titleState={titleState}
        prevPath={prevPath}
        navLinks={navLinks}
      />
      <Nav paths={paths} setPrevPath={setPrevPath} />
    </>
  );
}

export default withRouter(Header);