import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AxiosModel from '../../models/axios';
import Alert from '../Alert/Alert';

const Signup = ({ close }) => {
  // Hooks
  const [ alerts, setAlerts ] = useState([]);
  const [ newUser, setUserValues ] = useState({
    username: '', // previous values
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = event => {
    setUserValues({
      ...newUser, // spread operator. copy the previous newUser first
      [event.target.name]: event.target.value, // Add any new changes
    })
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // console.log('new user: ', newUser)
      const response = await AxiosModel.signup(newUser);
      // console.log('Response: ',response);
      setAlerts([]); // clear old alerts
      localStorage.token = response.data.token;
      // success outcome: close the modal
      close();
      // history.push(`/profile`)
    } catch(err) {
      // console.log(err.response);
      setAlerts(err.response.data.alerts)
    }
  }

  const getAlert = (name) => {
    if (alerts.length) {
      const alert = alerts.find( alert => alert.type === name)
      // console.log(alert);
      if (alert) return alert.message;
    } else return
  }

  // Nav button css
  const NavButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 50,
      padding: '0px 40px',
      // marginTop: '30px',
      boxShadow: '0 3px 5px 5px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
      fontSize: '1.5em',
    },
  })(Button);

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          helperText={getAlert('username')}
          error={getAlert('username') ? true : false}
          id="outlined-new-username"
          className={classes.textField}
          label="Username"
          onChange={handleChange}
          value={newUser.username}
          name="username"
          type="text"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          helperText={getAlert('email')}
          error={getAlert('email') ? true : false}
          id="outlined-email-input"
          className={classes.textField}
          label="Email"
          onChange={handleChange}
          value={newUser.email}
          autoComplete="email"
          name="email"
          type="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          helperText={getAlert('password')}
          error={getAlert('password') ? true : false}
          id="outlined-password-input"
          className={classes.textField}
          label="Password"
          onChange={handleChange}
          value={newUser.password}
          name="password"
          type="password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          helperText={getAlert('password2')}
          error={getAlert('password2') ? true : false}
          id="outlined-password2-input"
          className={classes.textField}
          label="Confirm Password"
          onChange={handleChange}
          value={newUser.password2}
          name="password2"
          type="password"
          margin="normal"
          variant="outlined"
        />
        {alerts.filter(alert => alert.type === 'auth').map((alert, index) => (
          <Alert message={alert.message} status={alert.status} key={'signup-alert'+index} />
        ))}
        <NavButton 
          variant="contained" className={classes.button} type="submit" label="login">
          Signup
        </NavButton>
      </form>
    </>
  );
}
export default Signup;