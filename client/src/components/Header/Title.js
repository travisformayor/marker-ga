import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import AuthDialog from "../Auth/AuthDialog";
import posed, { PoseGroup } from 'react-pose';
import { tween } from 'popmotion';
import uuid from 'uuid'

// Define animations
const TitleText = posed.div({
  enter: { 
    y: 0,
    transition: {
      y: { 
        type: 'spring', 
      },
      // default: { duration: 1000 },
  }},
  exit: { y: -100 }
});
const TitleBar = posed.div({
  // pass props to here of the current and previous colors
  old: {
    background: ({oldC}) => `linear-gradient(${oldC})`,
  },
  new: {
    background: ({newC}) => `linear-gradient(${newC})`,
    transition: { 
      duration: 500,
      ease: 'linear',
    }
  }
});

const Title = (props) => {
  const { username, logOut, getProfile, auth, titleState, prevPath, navLinks } = props;
  // Get more info on previous path
  const prevNav = navLinks.find(nav => nav.path === prevPath.substr(1))
  // Hooks
  const [ anchor, setAnchor ] = useState(null);
  const [ animateToggle, setToggle ] = useState(false);
  const [ oldColor, setOld ] = useState((prevNav && prevNav.color) || '#ffa500, 30%, #f5f5dc');
  const [ newColor, setNew ] = useState(titleState.color);
  const open = Boolean(anchor);

  useEffect(() => {
    // Title changed, flip switch back to default
    setToggle(false)

    // Update the colors to the new values
    setOld((prevNav && prevNav.color) || '#ffa500, 30%, #f5f5dc')
    setNew(titleState.color)

    // Wait a tiny bit, then trigger the animations
    setTimeout(() =>{
      setToggle(true)
    }, 100)

  },[titleState])


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

  // console.log('previous path: ', prevPath.substr(1))
  // console.log('prev color: ', prevNav.color)
  
  // CSS Class Styles
  const useStyles = makeStyles(theme => ({
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      textAlign: 'center',
      // background: `linear-gradient(${})`, // dark blue
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
    },
    username: {
      textTransform: 'capitalize',
      borderBottom: '1px solid grey',
    }
  }));
  const classes = useStyles();

  return (
    <AppBar position="static">
      {/* <TitleBar pose={'load'}> */}
        <TitleBar 
          oldC={oldColor}
          newC={newColor}
          pose={animateToggle ? 'new' : 'old'} 
          className={classes.topBar}>
          {/* <PoseGroup> */}
            <TitleText key={uuid()}
              pose={animateToggle ? 'enter' : 'exit'}>
              <Typography variant="h3" className={classes.title}>
                {titleState.title}
              </Typography>
            </TitleText>
          {/* </PoseGroup> */}
          {auth ? (
          <div className={classes.profileControl}>
            <IconButton
              aria-label="Profile Options"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle style={{ fontSize: 40 }} />
            </IconButton>
            <Menu
              className={classes.dropMenu}
              id="profile-menu"
              open={open}
              onClose={handleClose}
              anchorEl={anchor}
            >
              <MenuItem disabled className={classes.username}>
                {username}
              </MenuItem>
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
        {/* </Toolbar> */}
      </TitleBar>
    </AppBar>
  );
};

export default Title;
