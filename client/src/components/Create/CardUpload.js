import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AxiosModel from '../../models/axios';
import Alert from '../Alert/Alert';
import Progress from './Progress';

// Nav button css
const NavButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 50,
    padding: '0px 40px',
    // marginTop: '30px',
    boxShadow: '0 3px 5px 5px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
    fontSize: '1.5em',
  },
})(Button);

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
}));

const CardUpload = ({ draftid }) => {
  const classes = useStyles();
  const [ file, setFile ] = useState(null);
  const [ filename, setFilename ] = useState('Choose File');
  const [ uploadedFiles, setUploadedFiles ] = useState([]);
  const [ alerts, setAlerts ] = useState([]);
  const [ uploadPercentage, setUploadPercentage ] = useState(0);
  const [ processing, setProcessing ] = useState(false);
  const [ uploading, setUploading ] = useState(false);
  const [ cardDraft, setCardDraft ] = useState({
    title: '',
    desc: '',
    // email: '',
    // password: '',
    // password2: '',
  });

  const handleChange = event => {
    setCardDraft({
      ...cardDraft, // spread operator. copy the previous newUser first
      [event.target.name]: event.target.value, // Add any new changes
    })
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await AxiosModel.updateDraft(cardDraft, draftid, localStorage.token);
      console.log('Response: ', response);
      // setAlerts([]); // clear old alerts
      // localStorage.token = response.data.token;
      // success outcome: close the modal
      // close();
      // history.push(`/profile`)
    } catch(err) {
      console.log(err);
      // setAlerts(err.response.data.alerts)
    }
  }


  useEffect(() => {
    // console.log('upload percentage: ', uploadPercentage)
    if (uploadPercentage === 100) {
      setProcessing(true);
    }
  }, [uploadPercentage])

  useEffect(() => {
    // console.log('file change detected')
    if (file) {
      uploadFile();
    }
    // eslint-disable-next-line
  },[file])


  const selectFile = e => {
    // File selected
    // console.log('target: ', e.target.files)
    if (e.target.files.length > 0) {
      // console.log('setting file...')
      // [0] since it can be an array of files but we only want one
      setFile(e.target.files[0]); 
      setFilename(e.target.files[0].name);

      // uploadFile();
    } else {
      // file selection was cancelled
    }
  }

  const uploadFile = async e => {
    // console.log('submitting...')
    setAlerts([]); // clear out any old alerts from previous upload attempts
    const formData = new FormData(); //js datatype
    formData.append('file', file); // sent as req.files.file in the backend
    
    if (localStorage.token) {
      try {
        setUploading(true);
        const res = await AxiosModel.sendImage(formData, setUploadPercentage, localStorage.token)
        setUploading(false);
        // Response in, stop the 'processing' progress bar action
        // console.log('response has returned')
        setProcessing(false)
        // clear the percentage 10 seconds after done
        setTimeout(() => setUploadPercentage(0), 10000);
        // save response object into state
        const { alerts } = res.data; // from the backend
        // console.log('response: ', alerts);
        // ToDo: these two setStates look redundant
        if (alerts[0].fileName) {
          setUploadedFiles(alerts)
        }
        setAlerts(alerts)
      } catch(err) {
        setUploading(false);
        console.error(err);
        setUploadPercentage(0);
        setProcessing(false)
        if (err.response.status === 413) {
          setAlerts([{
            message: 'The file size is too damn high!', 
            status: 'error',
            type: 'upload',
          }]);
        } else { 
          // stuff like the 'no file uploaded' message from server
          setAlerts(err.response.data.alerts);
        }
      }
    }
  }
  return (
    <>
      {alerts.filter(alert => alert.type === 'upload').map((alert, index) => (
        <Alert message={alert.message} status={alert.status} key={'login-alert'+index} />
      ))}

      <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-draft-title"
          className={classes.textField}
          label="Title"
          onChange={handleChange}
          value={cardDraft.title}
          name="title"
          type="text"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-draft-desc"
          className={classes.textField}
          label="Description"
          onChange={handleChange}
          value={cardDraft.desc}
          name="desc"
          type="text"
          margin="normal"
          variant="outlined"
        />
        <NavButton 
          variant="contained" className={classes.button} type="submit" label="login">
          Save Draft
        </NavButton>
      </form>

      <Progress percentage={uploadPercentage} uploading={uploading} processing={processing} selectFile={selectFile} />
      
      <p>{!uploading && !processing ? filename : null }</p>
      <p>{uploading && !processing ? `Uploading ${filename}...` : null}</p>
      <p>{uploading && processing ? `Processing ${filename}...` : null }</p>

      {/* Show Image when done */}
      {uploadedFiles.filter(file => file.type === 'upload').map((file, index) => (
        <div key={'image'+index}>
          <h3>{file.fileName}</h3>
          <img style={{width: '100%'}} src={file.filePath} alt={'Uploaded: ' + file.fileName} />
        </div>
       ))}
    </>
  )
}

export default CardUpload;