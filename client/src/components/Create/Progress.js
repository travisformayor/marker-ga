import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  progress: {
    // margin: theme.spacing(2),
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: -1,
    margin: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const Progress = ({ percentage,  uploading, processing, selectFile }) => {
  // console.log('percentage: ', percentage)
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple={false}
            type="file"
            onChange={selectFile}
            disabled={uploading}
            />
          <label htmlFor="contained-button-file">
            <Fab
              component="span" 
              aria-label="Add"
              color="primary"
              disabled={uploading}
              className={classes.fab}
              >
              <AddIcon />
            </Fab>
          </label>
          <CircularProgress 
            size={68} 
            className={classes.progress} 
            value={percentage}
            variant={processing ? "indeterminate" : "determinate"}
            color="primary"
          />
        </div>
      </div>
  );
};

// check the var type for the Progress prop
Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
