import React, { useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';


const FileUpload = () => {
  const [ file, setFile ] = useState('');
  const [ filename, setFilename ] = useState('Choose File');
  const [ uploadedFile, setUploadedFile ] = useState({});
  const [ message, setMessage ] = useState('');
  const [ uploadPercentage, setUploadPercentage ] = useState(0);

  const onChange = e => {
    console.log(e.target)
    setFile(e.target.files[0]); // single file upload, so [0] since it can be an array of files
    setFilename(e.target.files[0].name);
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(); //js datatype
    formData.append('file', file); // sent as req.files.file in the backend
    
    try {
      const res = await axios.post('/upload', formData, {
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
      const { fileName, filePath, msg } = res.data; // from the backend
      console.log('response: ', res.data);
      setUploadedFile({fileName, filePath});
      // console.log('File uploaded: ', uploadedFile);
      setMessage({msg: msg, status: 'info'}); // 'File Uploaded'

    } catch(err) {
        console.error(err);
        setUploadPercentage(0);
        if (err.response.status === 500) {
          setMessage({msg: 'There was a problem with the server', status: 'danger'});
        } else if (err.response.status === 413) {
          setMessage({msg: 'The file size is too damn high!', status: 'danger'});
        } else { 
          // stuff like the 'no file uploaded' message from server
          setMessage({msg: err.response.data.msg, status: 'danger'});
        }
    }
  }
  return (
    <>
      {message ? <Message msg={message.msg} status={message.status}/> : null}
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

export default FileUpload;