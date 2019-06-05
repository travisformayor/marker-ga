import React from 'react';
import './Error.css'

const Error = (props) => { // functional component
  return (
    <div className="alert error">
      <p>{props.message}</p>
    </div>
  );
};

export default Error;