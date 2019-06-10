import React, { useState, useEffect } from 'react';
import Alert from '../Alert/Alert';
import Progress from './Progress';
import axios from 'axios';

const CardUpload = () => {
  const [ file, setFile ] = useState(null);
  const [ filename, setFilename ] = useState('Choose File');
  const [ uploadedFile, setUploadedFile ] = useState({});
  const [ alerts, setAlerts ] = useState([]);
  const [ uploadPercentage, setUploadPercentage ] = useState(0);
  const [ processing, setProcessing ] = useState(false);
  const [ uploading, setUploading ] = useState(false);

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
  },[file])


  const selectFile = e => {
    // File selected
    console.log('target: ', e.target.files)
    if (e.target.files.length > 0) {
      console.log('setting file...')
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
    
    try {
      setUploading(true);
      const res = await axios.post('/api/v1/create/uploadimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          // will get .loaded and .total
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );            
        }
      });
      setUploading(false);
      // Response in, stop the 'processing' progress bar action
      console.log('response has returned')
      setProcessing(false)
      // clear the percentage 10 seconds after done
      setTimeout(() => setUploadPercentage(0), 10000);
      // save response object into state
      const { fileName, filePath, alerts } = res.data; // from the backend
      console.log('response: ', res.data);
      setUploadedFile({fileName, filePath});
      // console.log('File uploaded: ', uploadedFile);
      setAlerts(alerts)
      // setAlerts({msg: msg, status: 'info'}); // 'File Uploaded'

    } catch(err) {
      setUploading(false);
      console.error(err);
      setUploadPercentage(0);
      setProcessing(false)
      // if (err.response.status === 500) {
      //   setAlerts({message: 'There was a problem with the server', status: 'error'});
      // } else 
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
  return (
    <>
      {/* {console.log('alerts: ', alerts)} */}
      {alerts.filter(alert => alert.type === 'upload').map((alert, index) => (
        <Alert message={alert.message} status={alert.status} key={'login-alert'+index} />
      ))}
      <Progress percentage={uploadPercentage} uploading={uploading} processing={processing} selectFile={selectFile} />
      
      <p>{!uploading && !processing ? filename : null }</p>
      <p>{uploading && !processing ? `Uploading ${filename}...` : null}</p>
      <p>{uploading && processing ? `Processing ${filename}...` : null }</p>

      {/* Show Image when done */}
      {(Object.keys(uploadedFile).length > 0) ? (
        <div>
          <h3>{uploadedFile.fileName}</h3>
          <img style={{width: '100%'}} src={uploadedFile.filePath} alt={'Uploaded: ' + uploadedFile.fileName} />
        </div>
       ) : null }
    </>
  )
}

export default CardUpload;