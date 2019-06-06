import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    },
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
    },
  })(Button);

  return (
    <div className={classes.navButtons}>
      {paths.map((nav, index) => (
        <NavButton 
          component={Link} to={nav.path} key={'nav-button'+index}
          style={{ background: `linear-gradient(${nav.color})` }}
        >
          {nav.name}
        </NavButton>
      ))}
    </div>
  )
}

export default Nav;