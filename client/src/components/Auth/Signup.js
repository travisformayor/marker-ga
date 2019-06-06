import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AxiosModel from '../../models/axios';
import Error from '../Error/Error';

const Signup = ({ close }) => {
  // Hooks
  const [ errors, setErrors ] = useState([]);
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
      const response = await AxiosModel.signup(newUser);
      // console.log('Response: ',response);
      setErrors([]); // clear old errors
      localStorage.token = response.data.token;
      // success outcome: close the modal
      close();
      // history.push(`/profile`)
    } catch(err) {
      // console.log(err.response);
      setErrors(err.response.data.errors)
    }
  }

  const getError = (name) => {
    if (errors.length) {
      const error = errors.find( error => error.type === name)
      // console.log(error);
      if (error) return error.message;
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
      <form onSubmit={handleSubmit} className={classes.container} noValidate={false} autoComplete="off">
        <TextField
          required
          helperText={getError('username')}
          error={getError('username') ? true : false}
          id="outlined-new-username"
          className={classes.textField}
          label="Username"
          onChange={handleChange}
          value={newUser.username}
          name="username"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          helperText={getError('email')}
          error={getError('email') ? true : false}
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
          helperText={getError('password')}
          error={getError('password') ? true : false}
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
          helperText={getError('password2')}
          error={getError('password2') ? true : false}
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
        {errors.filter(error => error.type === 'extra').map((error, index) => (
          <Error message={error.message} key={'signup-error'+index} />
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