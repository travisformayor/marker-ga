import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import posed, { PoseGroup } from 'react-pose';
import uuid from 'uuid';

// Define Animations
const NavItem = posed.div({
  enter: { 
    delay: ({index}) => index*100,
    y: 0, opacity: 1,
    transition: {
      y: { 
        type: 'tween', 
      }
    },
  },
  exit: { y: -15, opacity: 0},
});

const Nav = (props) => {
  const { paths, setPrevPath, history, location } = props

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
      padding: '0px 20px',
      margin: '0px 5px',
      boxShadow: '0 3px 3px 3px rgba(100, 100, 100, .3)',
    },
    label: {
      textTransform: 'capitalize',
    }
  })(Button);

  const handleNavClick = (newPath) => {
    // console.log('where we are: ', location.pathname);
    // console.log('where we are going: ', newPath)
    setPrevPath(location.pathname);
    history.push(`/${newPath}`);
  }

  return (
    <div className={classes.navButtons}>
      <PoseGroup>
        {paths.map((nav, index) => (
          <NavItem key={uuid()} index={index}>
            <NavButton onClick={() => handleNavClick(nav.path)}//to={nav.path} component={Link}
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

export default withRouter(Nav);