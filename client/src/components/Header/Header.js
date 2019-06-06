import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import AuthDialog from '../Auth/AuthDialog';
import Nav from './Nav';

function Header(props) {
  const { userInfo: { loggedIn }, logOut, getProfile } = props;
  const defaultTitle = {title: '404', color: 'orange, beige'}
  // Hooks
  const [ auth, setAuth ] = useState(false);
  const [ anchor, setAnchor ] = useState(null);
  const [ paths, setPaths ] = useState([]);
  const [ titleState, setTitle ] = useState({
    ...defaultTitle,
  })
  const open = Boolean(anchor);

  const navLinks = [
    {name: 'main', path: '', color: '#3f51b5, 30%, #6573c3'}, // dark blue
    {name: 'create', path: 'create', color: '#2196f3, 30%, #4dabf5'}, // lite blue
    {name: 'trade', path: 'trade', color: '#ff5722, 30%, #ff784e'}, // orange
    {name: 'artists', path: 'artists', color: '#4caf50, 30%, #6fbf73'}, // green
    {name: 'profile', path: 'profile', color: '#673ab7, 30%, #8561c5'}, // purple
  ]
  
  const getPath = () => {
    const pathname = props.location.pathname.split('/')[1]; // ignore any trailing /pages
    // console.log('current path: ', pathname)
    // Set state for the other paths
    const newPaths = navLinks.filter(navOption => navOption.path !== pathname);
    setPaths(newPaths); // all paths except current page
    
    // Set the title bar state
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
  
  useEffect(() => {
    // record logged in status
    setAuth(loggedIn);
  },[loggedIn]);
  
  useEffect(() => {
    getPath();
  },[props.location.pathname]); // re-run whenever path changes

  // Profile Menu drop down menu functions
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  }
  const handleClose = () => {
    setAnchor(null);
  }
  const handleLogout = () => {
    logOut();
    handleClose();
  }

  // CSS Class Styles
  const useStyles = makeStyles(theme => ({
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      textAlign: 'center',
      background: `linear-gradient(${titleState.color})`, // dark blue
    },
    title: {
      textTransform: 'capitalize',
    },
    profileControl: {
      position: 'absolute',
      right: 0,
      marginRight: '20px',
    },
    dropMenu: {
      marginTop: 50,
    }
  }));
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.topBar}>
          <Typography variant="h3" className={classes.title}>
            {titleState.title}
          </Typography>
          {auth ? (
            <div className={classes.profileControl}>
              <IconButton
                aria-label="Profile Options"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              ><AccountCircle style={{ fontSize: 40 }} /></IconButton>
              <Menu
                className={classes.dropMenu}
                id="profile-menu"
                open={open}
                onClose={handleClose}
                anchorEl={anchor}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className={classes.profileControl}>
              <AuthDialog getProfile={getProfile} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Nav paths={paths} auth={auth}/>
      {/* <button onClick={() => setAuth(!auth)}>
        Login - {auth ? "true" : "false"}
      </button> */}
    </>
  );
}

export default withRouter(Header);