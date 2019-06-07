import React, { useState } from "react";
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
import uuid from 'uuid'

// Define animations
const TitleText = posed.div({
  enter: { 
    y: 0,
    transition: {
      y: { 
        type: 'spring', 
        // stiffness: 1000, 
        // damping: 15 
      },
    default: { duration: 300 }
  }},
  exit: { y: -100 }
})

const Title = ({ username, logOut, getProfile, auth, titleState }) => {
  // Hooks
  const [ anchor, setAnchor ] = useState(null);
  const open = Boolean(anchor);

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
    },
    username: {
      textTransform: 'capitalize',
      borderBottom: '1px solid grey',
    }
  }));
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.topBar}>
        <PoseGroup><TitleText key={uuid()}>
        <Typography variant="h3" className={classes.title}>
          {titleState.title}
        </Typography>
        </TitleText></PoseGroup>
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
      </Toolbar>
    </AppBar>
  );
};

export default Title;
