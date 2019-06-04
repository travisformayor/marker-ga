import React, { useEffect, useState } from 'react';
import Error from '../Error/Error';
import AxiosModel from '../../models/axios';

const Profile = () => {
  // Hooks
  const [ errors, setErrors ] = useState([]);
  const [ userData, setUserData ] = useState({
    username: '',
    email: '',
    signupDate: '',
  });

  useEffect(() => {
    const getProfile = async () => {
      // console.log('token in localstore: ', localStorage.token)
      if (localStorage.token) {
        try {
          const response = await AxiosModel.getProfile(localStorage.token);
          // console.log('Token check went through', response.data);
          setUserData({
            username: response.data.foundUser.username,
            email: response.data.foundUser.email,
            signupDate: response.data.foundUser.signupDate,
          });
        } catch(err) {
          // console.log('err.response);
          // setErrors(err.response.data.errors);
          setErrors(err.response.data.errors);
        }
      }
    }
    getProfile();
  }, []);

  const { email, username, signupDate } = userData;

  return(
    <>
      <h1>Profile</h1>
      {errors.map((error, index) => (
        <Error message={error.message} key={index} />
      ))}
      <p>{username}</p>
      <p>{email}</p>
      <p>{signupDate}</p>
    </>
  )
}

export default Profile;