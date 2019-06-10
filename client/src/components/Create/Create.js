import React from 'react';
import CardUpload from './CardUpload';
import Alert from '../Alert/Alert'

const Create = (props) => {
  const { loggedIn } = props.user; // user: {name, username},
  // If visitor is not logged in, show a message. Login/register required to create cards
  return (
    <>
      {!loggedIn ? (
        <Alert message={'You need to be logged in to create'} status={'error'} />
      ) : (
        <CardUpload />
        
      )}
    </>
  )
};

export default Create;