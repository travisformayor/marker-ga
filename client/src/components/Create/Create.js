import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Build from './Build';
import Alert from '../Alert/Alert';
import AxiosModel from '../../models/axios';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Create = (props) => {
  const classes = useStyles();
  const { loggedIn } = props.user; // user: {name, username},
  const [ drafts, setDrafts ] = useState([]);
  
  const getDrafts = async () => {
    console.log('token in localstore: ', localStorage.token)
    if (localStorage.token) {
      try {
        console.log('Looking up drafts for user...');
        const response = await AxiosModel.getDrafts(localStorage.token);
        // ToDo: add a check here to make sure foundDrafts is present
        const { foundDrafts } = response.data
        console.log('drafts found? ', foundDrafts)
        // setDrafts(foundDrafts);
      } catch(err) {
        console.log('err.response', err.response);
        // setAlerts(err.response.data.alerts);
        // setAlerts(err.response.data.alerts);
      }
    }
  }

  const newDraft = async () => {
    // console.log('token in localstore: ', localStorage.token)
    if (localStorage.token) {
      try {
        // console.log('Creating new blank draft for user...');
        const response = await AxiosModel.newDraft(localStorage.token);
        console.log('new draft response: ', response);
        // re-run get all drafts
        getDrafts();
      } catch(err) {
        console.log('err.response', err.response);
        // ToDo: more robust error handling with alerts
        // setAlerts(err.response.data.alerts);
        // setAlerts(err.response.data.alerts);
      }
    }
  }

  // If visitor is not logged in, show a message. Login/register required to create cards
  return (
    <>
      {!loggedIn ? (
        <Alert message={'You need to be logged in to create'} status={'error'} />
      ) : (
        <>
          <Button 
            variant="contained" color="primary" 
            aria-label="New Draft" className={classes.button}
            onClick={newDraft}
            >
            <Icon>edit_icon</Icon>
            New Draft
          </Button>
          <Build />
        </>
      )}
    </>
  )
};

export default Create;