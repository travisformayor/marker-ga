import React, { useState } from 'react';
// import axios from 'axios';

const Login = ({ setCurrentUser, history }) => { // destructure setCurrentUser out of props
  // Hooks
  const [ errors, setErrors ] = useState([]);
  const [ userData, setUserData ] = useState({
    email: '',
    password: '',
  });

  const handleChange = event => {
    setUserData({
      ...userData, // spread operator. copy the previous values ont first
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/login`, userData, { withCredentials: true });
      console.log('Response: ',response);
      const currentUser = response.data.success.id;
      localStorage.currentUser = currentUser; // save to localstorage to protect against refreshes
      setCurrentUser(currentUser);
      history.push(`/profile/${currentUser}`)

    } catch(err) {
      console.log(err);
      setErrors(err.response.data.errors)
    }
  }

  const { email, password } = userData;

  return(
    <section className="form">
      {errors ? errors.map(error => `${error.message}. `) : null }
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={email} onChange={handleChange} placeholder="Email Address" />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
        <input type="submit" value="Submit" />
      </form>
    </section> 
    )
}

export default Login;