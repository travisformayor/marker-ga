import React, { useState } from 'react';
import Alert from '../Alert/Alert';
import Progress from './Progress';
import axios from 'axios';


const CardUpload = () => {
  const [ file, setFile ] = useState('');
  const [ filename, setFilename ] = useState('Choose File');
  const [ uploadedFile, setUploadedFile ] = useState({});
  const [ alerts, setAlerts ] = useState([]);
  const [ uploadPercentage, setUploadPercentage ] = useState(0);

  const onChange = e => {
    console.log('target: ', e.target.files)
    if (e.target.files.length > 0) {
      // [0] since it can be an array of files but we only want one
      setFile(e.target.files[0]); 
      setFilename(e.target.files[0].name);
    } else {
      // file selection was cancelled
    }
  }

  const onSubmit = async e => {
    e.preventDefault();
    setAlerts([]); // clear out any old alerts from previous upload attempts
    const formData = new FormData(); //js datatype
    formData.append('file', file); // sent as req.files.file in the backend
    
    try {
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
          // clear the percentage 10 seconds after done
        }
      });
      setTimeout(() => setUploadPercentage(0), 10000);
      // save response object into state
      const { fileName, filePath, alerts } = res.data; // from the backend
      console.log('response: ', res.data);
      setUploadedFile({fileName, filePath});
      // console.log('File uploaded: ', uploadedFile);
      setAlerts(alerts)
      // setAlerts({msg: msg, status: 'info'}); // 'File Uploaded'

    } catch(err) {
        console.error(err);
        setUploadPercentage(0);
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
      {console.log('alerts: ', alerts)}
      {alerts.filter(alert => alert.type === 'upload').map((alert, index) => (
        <Alert message={alert.message} status={alert.status} key={'login-alert'+index} />
      ))}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <Progress percentage={uploadPercentage} />
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </form>
      {/* {console.log('uploaded file %: ', uploadPercentage)} */}
      {(Object.keys(uploadedFile).length > 0) ? (
        <div className="row mt-5">
          <h3 className="text-center">{uploadedFile.fileName}</h3>
          <img style={{width: '100%'}} src={uploadedFile.filePath} alt={'Uploaded: ' + uploadedFile.fileName} />
        </div>
       ) : null }
    </>
  )
}

export default CardUpload;