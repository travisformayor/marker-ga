import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AxiosModel from '../../models/axios';
import Alert from '../Alert/Alert';
import Progress from './Progress';

// Special Buttons
const SaveButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #35baf6 30%, #009688 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 50,
    padding: '0px 40px',
    // marginTop: '30px',
    boxShadow: '0 3px 3px 2px rgba(0, 0, 0, .2)',
  },
  label: {
    textTransform: 'capitalize',
    fontSize: '1.5em',
  },
})(Button);

const SubmitButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 50,
    padding: '0px 40px',
    // marginTop: '30px',
    boxShadow: '0 3px 3px 2px rgba(0, 0, 0, .2)',
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
  buttonHolder: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
    // flexGrow: 1,
    width: '40%'
  },
  centerBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
  },
  imgHolder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
  },
  imageItem: {
    width: 'auto', 
    height: 'auto',
    maxWidth: '600px',
    minWidth: '200px',
  }
}));

const CardUpload = ({ refresh, info, toggleMini }) => {
  const classes = useStyles();
  const [ file, setFile ] = useState(null);
  const [ filename, setFilename ] = useState('Choose File');
  const [ uploadedFiles, setUploadedFiles ] = useState([]);
  const [ uploadPercentage, setUploadPercentage ] = useState(0);
  const [ processing, setProcessing ] = useState(false);
  const [ uploading, setUploading ] = useState(false);
  const [ alerts, setAlerts ] = useState([{
    message: '', 
    status: '',
    type: '',
  }]);
  const [ cardDraft, setCardDraft ] = useState({
    title: info.title,
    desc: info.desc,
    microName: info.microName,
    microUrl: info.microUrl,
    fileName: info.fileName,
    fileUrl: info.fileUrl,
  });
  const [currentImage, setImage ] = useState();
  const [loading, setLoading ] = useState(true);

  const handleChange = async event => {
    setCardDraft({
      ...cardDraft, // spread operator. copy the previous newUser first
      [event.target.name]: event.target.value, // Add any new changes
    });
    // Test work at removing the submit draft button:
    // try {
    //   await AxiosModel.updateDraft(cardDraft, info._id, localStorage.token);
    //   refresh();
    // } catch(err) {
    //   console.log(err);
    // }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // const response = await AxiosModel.updateDraft(cardDraft, info._id, localStorage.token);
      // console.log('Response: ', response);
      await AxiosModel.updateDraft(cardDraft, info._id, localStorage.token);
      refresh();
      // setAlerts([]); // clear old alerts
      // localStorage.token = response.data.token;
      // success outcome: close the modal
      // close();
      // history.push(`/profile`)
    } catch(err) {
      // console.log(err);
      // setAlerts(err.response.data.alerts)
    }
  }

  const handleCreate = async e => {
    e.preventDefault();
    try {
      // const response = await AxiosModel.submitCard(info._id, localStorage.token);
      // console.log('Response: ', response);
      await AxiosModel.submitCard(info._id, localStorage.token);
      refresh();
      toggleMini();
    } catch(err) {
      // console.log(err);
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

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setCardDraft({
        ...cardDraft, // spread operator. copy the previous newUser first
        microName: uploadedFiles[1].fileName || '',
        microUrl: uploadedFiles[1].filePath || '',
        fileName: uploadedFiles[0].fileName || '',
        fileUrl: uploadedFiles[0].filePath || '',
      })
    }
    // console.log('file change detected')
    // if (file) {
    //   uploadFile();
    // }
    // eslint-disable-next-line
  },[uploadedFiles])

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
    formData.append('id', info._id)
    
    if (localStorage.token) {
      try {
        setUploading(true);
        // console.log('formdata: ', formData)
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
          setUploadedFiles(alerts) // this sets all the res data
        }
        setAlerts(alerts)
      } catch(err) {
        setUploading(false);
        console.error(err);
        console.error(err.response.data);
        setUploadPercentage(0);
        setProcessing(false)
        if (err.response.status === 413) {
        // if (err.response.data === "File to large") {
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

  const loadImage = src => {
    const image = new Image()
    image.onload = () => {
      setImage(src)
      setLoading(false)
    }
    image.src = src
  }

  useEffect(() => {
    setImage(cardDraft.microUrl);
  },[cardDraft.microUrl])

  useEffect(() => {
    loadImage(cardDraft.fileUrl);
  },[cardDraft.fileUrl])

  const style = loadingStatus => {
    return {
      width: '100%',
      height: '100%',
      transition: '0.5s filter linear',
      filter: `${loadingStatus ? 'blur(10px)' : ''}`,
    }
  }

  return (
    <>
      {cardDraft.fileName ? (
        <div className={classes.imgHolder}>
          <h5>{cardDraft.fileName}</h5>
          <img className={classes.imageItem} style={style(loading)} src={currentImage} alt={'Uploaded: ' + cardDraft.fileName} />
        </div>
      ) : ( null )}

      {alerts.filter(alert => alert.type === 'upload').map((alert, index) => (
        <Alert message={alert.message} status={alert.status} key={'login-alert'+index} />
      ))}
      
      <form className={classes.container} noValidate autoComplete="off"> 
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
      </form>

      <div className={classes.centerBox}>
        <p style={{fontSize: '.75em'}}>jpg/png only. 3mb limit</p>
        <Progress percentage={uploadPercentage} uploading={uploading} processing={processing} selectFile={selectFile} />
        {!uploading && !processing ? (<h5> {filename} </h5> ): null }
        {uploading && !processing ? (<h5>Uploading {filename}...</h5>) : null}
        {uploading && processing ? (<h5>Processing {filename}...</h5>) : null }
      </div>

      <div className={classes.buttonHolder}>
        <SaveButton 
          variant="contained" className={classes.button} 
          type="submit" label="login" onClick={handleSubmit} >
          Save Draft
        </SaveButton>
        {info.title && info.fileUrl ? (
          <SubmitButton 
            variant="contained" className={classes.button} 
            type="submit" label="login" onClick={handleCreate} >
            Submit to Gallery
          </SubmitButton>
        ) : null }
      </div>
    </>
  )
}

export default CardUpload;