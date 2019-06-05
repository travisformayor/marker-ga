import React, { useState } from 'react';
import Error from '../Error/Error';
import AxiosModel from '../../models/axios'

const Signup = () => {
  // Hooks
  const [ errors, setErrors ] = useState([]);
  const [ newUser, setNewUser ] = useState({
    username: '', // previous values
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = event => {
    setNewUser({
      ...newUser, // spread operator. copy the previous values ont first
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log('New user: ', newUser);
    try {
      const response = await AxiosModel.signup(newUser);
      // console.log('Response: ', response);
      setErrors([]);
      localStorage.token = response.data.token;
      // success outcome: redirect? dismiss modal?
      // history.push(`/profile/${currentUser}`)
    } catch(err) {
      // console.log(err.response); // Note: .response is necessary of you get the generic error only
      setErrors(err.response.data.errors);
    }
  }

  const {username, email, password, password2 } = newUser;
  return(
    <>
      <section className="form">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>       
          <input type='text' name='username' value={username} placeholder="Username" onChange={handleChange} />
          <input type='text' name='email' value={email} placeholder="Email" onChange={handleChange} />
          <input type='password' name='password' value={password} placeholder="Password" onChange={handleChange} />
          <input type='password' name='password2' value={password2} placeholder="Confirm Password" onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
        {errors.map((error, index) => (
          <Error message={error.message} key={index} />
        ))}
      </section>
    </>
  )
}

export default Signup;