import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Login from './Login'
import Signup from './Signup'

const AuthDialog = (props) => {
  const { fullScreen, getProfile } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    getProfile();
  }

  const useStyles = makeStyles(theme => ({
    center: {
      textAlign: 'center',
      margin: '0px auto',
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Button 
        variant="outlined" color="inherit" 
        onClick={handleOpen}
      >
        Login / Signup
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.center}>
          {"Login / Signup"}
        </DialogTitle>
        <DialogContent>

          <Login close={handleClose} />

          <DialogContentText id="alert-dialog-description" className={classes.center}>
            - or -
          </DialogContentText>

          <Signup close={handleClose} />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" className={classes.center}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withMobileDialog()(AuthDialog);