import React from 'react';
// import Error from '../Error/Error';
// import AxiosModel from '../../models/axios';

const Profile = (props) => {
  const { user: {name, username, email, signupDate }} = props // avatar, twitter
  
  return(
    <>
      <h1>Profile</h1>
      <p>{name}</p>
      <p>{username}</p>
      <p>{email}</p>
      <p>{signupDate}</p>
    </>
  )
}

export default Profile;