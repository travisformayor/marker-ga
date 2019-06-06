import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import AuthDialog from '../Auth/AuthDialog';

function Header(props) {
  const { userInfo: { loggedIn }, logOut, getProfile } = props;
  // Hooks
  const [ auth, setAuth ] = useState(false);
  const [ anchor, setAnchor ] = useState(null);

  const open = Boolean(anchor);

  useEffect(() => {
    setAuth(loggedIn);
  },[loggedIn]);

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

  // Nav button css
  const NavButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 40,
      padding: '0px 25px',
      margin: '0px 5px',
      boxShadow: '0 3px 5px 5px rgba(255, 105, 135, .3)',
      // position: 'absolute',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  // CSS Class Styles
  const useStyles = makeStyles(theme => ({
    navTop: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      textAlign: 'center',
    },
    navBottom: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px 5px 20px',
      textAlign: 'center',
    },
    title: {
      // display: 'inline-block',
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
        <Toolbar className={classes.navTop}>
          <Typography variant="h3" className={classes.title}>
            Test One
          </Typography>
          {auth ? (
            <div className={classes.profileControl}>
              <IconButton
                aria-label="Profile Options"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              ><AccountCircle /></IconButton>
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
      <div className={classes.navBottom}>
        <NavButton component={Link} to="/">
          main
        </NavButton>
        <NavButton component={Link} to="/create">
          create
        </NavButton>
        <NavButton component={Link} to="/artists">
          artists
        </NavButton>
        <NavButton component={Link} to="/profile">
          profile
        </NavButton>
      </div>
      {/* <button onClick={() => setAuth(!auth)}>
        Login - {auth ? "true" : "false"}
      </button> */}
    </>
  );
}

export default Header;