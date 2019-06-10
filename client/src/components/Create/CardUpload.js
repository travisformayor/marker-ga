import React, { useState, useEffect } from 'react';
import AxiosModel from '../../models/axios';
import Alert from '../Alert/Alert';
import Progress from './Progress';

const CardUpload = () => {
  const [ file, setFile ] = useState(null);
  const [ filename, setFilename ] = useState('Choose File');
  const [ uploadedFiles, setUploadedFiles ] = useState([]);
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