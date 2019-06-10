import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CardUpload from './CardUpload';
const moment = require('moment');

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  delete: {
    // zIndex: '1',
  },
  draftMini: {
    width: '100%',
    padding: '20px',
    margin: '5px',
    backgroundColor: '#35baf6',
    color: 'white',
    fontWeight: 'normal',
    fontSize: '1.5em',
    textAlign: 'center',
    // border: '1px solid red',
  },
  draft: {
    width: '100%',
    margin: '5px',
    // border: '1px solid red',
  },
  draftTitle: {
    backgroundColor: '#35baf6',
    color: 'white',
    padding: '20px',
    // margin: '0 5px',
    width: '100%',
    fontWeight: 'bold',
    fontSize: '1.5em',
    textAlign: 'center',
  },
  draftBody: {
    backgroundColor: 'white',
    border: '3px solid #35baf6',
    color: 'black',
    padding: '20px',
    // margin: '0 5px',
    width: '100%',
    fontWeight: 'normal',
    fontSize: '1.5em',
    textAlign: 'left',
  },
}));

const Build = (props) => {
  const classes = useStyles();
  const { info: { createdDate, title } } = props;
  const [ mini, setMini ] = useState(true);
  // console.log('build: ', props)

  const toggleMini = () => {
    console.log('toggle!');
    setMini(!mini);
  }

  return (
    <>
      {mini ? (
        <div className={classes.draftMini} onClick={toggleMini} >
          <IconButton className={classes.delete} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
          <span>{title ? title : 'Untitled'} - {moment(createdDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
        </div>
        ) : (
        <div className={classes.draft} onClick={toggleMini} >
          <div className={classes.draftTitle}>
            <IconButton className={classes.delete} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
            <span>{title ? title : 'Untitled'} - {moment(createdDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
          </div>
          <div className={classes.draftBody}>
            <CardUpload />
          </div>
        </div>
      )}
    </>
  );
};

export default Build;