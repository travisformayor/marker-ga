import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import posed, { PoseGroup } from 'react-pose';
import uuid from 'uuid';

// Define Animations
const NavItem = posed.div({
  enter: { 
    y: 0, opacity: 1, 
    delay: ({index}) => index*250},
  exit: { y: -15, opacity: 0},
});

const Nav = (props) => {
  const { paths } = props

  // CSS Class Styles
  const useStyles = makeStyles(theme => ({
    navButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px 5px 20px',
      textAlign: 'center',
    }
  }));
  const classes = useStyles();

  // Nav button css
  const NavButton = withStyles({
    root: {
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 40,
      padding: '0px 25px',
      margin: '0px 5px',
      boxShadow: '0 3px 3px 3px rgba(100, 100, 100, .3)',
    },
    label: {
      textTransform: 'capitalize',
    }
  })(Button);

  return (
    <div className={classes.navButtons}>
      <PoseGroup>
        {paths.map((nav, index) => (
          <NavItem key={uuid()} index={index}>
            <NavButton component={Link} to={nav.path}
              style={{ background: `linear-gradient(${nav.color})` }}
            >
              {nav.name}
            </NavButton>
          </NavItem>
        ))}
      </PoseGroup>
    </div>
  )
}

export default Nav;