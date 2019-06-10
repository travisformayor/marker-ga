import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Build from './Build';
import Alert from '../Alert/Alert';
import AxiosModel from '../../models/axios';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    // margin: theme.spacing(1),
    margin: '5px auto',
    width: '150px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: '5px auto',
    // border: '1px solid blue',
    // flexWrap: 'wrap',
  },
}));

const Create = (props) => {
  const classes = useStyles();
  const { loggedIn } = props.user; // user: {name, username},
  const [ drafts, setDrafts ] = useState([]);

  useEffect(() => {
    getDrafts();
  },[])
  
  const getDrafts = async () => {
    // console.log('token in localstore: ', localStorage.token)
    if (localStorage.token) {
      try {
        // console.log('Looking up drafts for user...');
        const response = await AxiosModel.getDrafts(localStorage.token);
        // ToDo: add a check here to make sure foundDrafts is present
        const { foundDrafts } = response.data
        // console.log('drafts found: ', foundDrafts)
        setDrafts(foundDrafts);
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
        //const response = 
        await AxiosModel.newDraft(localStorage.token);
        // console.log('new draft response: ', response);
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
          <div className={classes.container}>
            <Button 
              variant="contained" color="primary" 
              aria-label="New Draft" className={classes.button}
              onClick={newDraft}
              >
              <Icon>edit_icon</Icon>
              New Draft
            </Button>
            {drafts.reverse().map((draft, index) => (
                <Build info={draft} key={'drafts'+index} />
            ))}
          </div>
        </>
      )}
    </>
  )
};

export default Create;