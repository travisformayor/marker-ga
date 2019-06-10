import React, { useState } from 'react';
import Build from './Build';
import Alert from '../Alert/Alert';
import AxiosModel from '../../models/axios';

const Create = (props) => {
  const { loggedIn } = props.user; // user: {name, username},
  const [ drafts, setDrafts ] = useState([]);
  
  const getDrafts = async () => {
    // console.log('token in localstore: ', localStorage.token)
    if (localStorage.token) {
      try {
        console.log('Looking up drafts for user...');
        const response = await AxiosModel.getDrafts(localStorage.token);
        // ToDo: add a check here to make sure foundDrafts is present
        const { foundDrafts } = response.data
        // console.log('drafts found? ', foundDrafts)
        // setDrafts(foundDrafts);
      } catch(err) {
        console.log('err.response', err.response);
        // setAlerts(err.response.data.alerts);
        setAlerts(err.response.data.alerts);
      }
    }
  }
  // If visitor is not logged in, show a message. Login/register required to create cards
  return (
    <>
      {!loggedIn ? (
        <Alert message={'You need to be logged in to create'} status={'error'} />
      ) : (
        <Build />
        
        
      )}
    </>
  )
};

export default Create;