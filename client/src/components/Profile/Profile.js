import React from 'react';
import Alert from '../Alert/Alert';
const moment = require('moment');

const Profile = (props) => {
  const { user: {name, username, email, signupDate }, loggedIn } = props.user // avatar, twitter
  
  return (
    <>
      {!loggedIn ? (
        <Alert message={'You are not logged in'} status={'error'} />
      ) : (
      <div style={{ textAlign: 'center' }}>
        <h1>Profile</h1>
        <p>{name}</p>
        <p>{username}</p>
        <p>{email}</p>
        <p>{moment(signupDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
      )}
  </>
  )
}

export default Profile;