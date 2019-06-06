import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const Alert = ({ message, status }) => {
  const useStyles = makeStyles(theme => ({
    alert: {
      borderRadius: '4px',
      margin: '10px',
      padding: '10px 20px',
      textAlign: 'center',
      overflow: 'hidden',
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
    },
    info: {
      backgroundColor: '#cce5ff',
      color: '#004085',
      border: '1px solid #b8daff',
    }
  }));
  const classes = useStyles();

  let classStyle;
  switch (status) {
    case 'error':
      classStyle = `${classes.alert} ${classes.error}`;
      break;
    case 'info':
      classStyle = `${classes.alert} ${classes.info}`;
      break;
    default:
      classStyle = `${classes.alert} ${classes.error}`;
      break;
  }

  return (
    <div className={classStyle}>
      <p>{message}</p>
    </div>
  );
};

// check the var type of the props
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

export default Alert;