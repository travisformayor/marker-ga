import React, { useState } from 'react';
import Error from '../Error/Error';
import AxiosModel from '../../models/axios';

const Login = () => {
  // Hooks
  const [ errors, setErrors ] = useState([]);
  const [ userData, setUserData ] = useState({
    username: '',
    password: '',
  });

  const handleChange = event => {
    setUserData({
      ...userData, // spread operator. copy the previous values first
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await AxiosModel.login(userData);
      // console.log('Response: ',response);
      setErrors([]);
      // const currentUser = response.data.success.id;
      localStorage.token = response.data.token;
      // success outcome: redirect? dismiss modal?
      // history.push(`/profile/${currentUser}`)
    } catch(err) {
      // console.log(err.response);
      setErrors(err.response.data.errors)
    }
  }

  const { username, password } = userData;

  return(
    <section className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
        <input type="submit" value="Submit" />
      </form>
      {errors.map((error, index) => (
        <Error message={error.message} key={index} />
      ))}
    </section> 
    )
}

export default Login;