import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import AxiosModel from '../../models/axios';
import Alert from '../Alert/Alert';

const Login = ({ close }) => {
  // Hooks
  const [ alerts, setAlerts ] = useState([]);
  const [ userValues, setValues ] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = event => {
    setValues({
      ...userValues, // spread operator. copy the previous userValues first
      [event.target.name]: event.target.value, // Add any new changes
    })
  };
  const handleClickShowPassword = () => {
    setValues({ ...userValues, showPassword: !userValues.showPassword });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await AxiosModel.login(userValues);
      // console.log('Response: ', response);
      setAlerts([]); // clear old alerts
      localStorage.token = response.data.token;
      // success outcome: dismiss modal
      close();
      // history.push(`/profile`)
    } catch (err) {
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
      <form onSubmit={handleSubmit} className={classes.container} noValidate={false} autoComplete="off">
        <TextField
          required
          helperText={getAlert('username')}
          error={getAlert('username') ? true : false}
          id="outlined-username"
          className={classes.textField}
          label="Username"
          onChange={handleChange}
          value={userValues.username}
          name="username"
          type="text"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          helperText={getAlert('password')}
          error={getAlert('password') ? true : false}
          id="outlined-adornment-password"
          className={classes.textField}
          label="Password"
          onChange={handleChange}
          value={userValues.password}
          name="password"
          type={userValues.showPassword ? 'text' : 'password'}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {userValues.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {alerts.filter(alert => alert.type === 'extra').map((alert, index) => (
          <Alert message={alert.message} status={'error'} key={'login-alert'+index} />
        ))}
        <NavButton 
          variant="contained" className={classes.button} type="submit" label="login">
          Login
        </NavButton>
      </form>
    </>
  );
}
export default Login;