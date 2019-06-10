import React from 'react';

const Main = () => {
  return(
    // <p>{card._id}</p>
    <div style={{margin: '0 auto', width: '100%', textAlign: 'center'}} >
      <h1>Marker</h1>
      <h2>React AWS S3 Gallery</h2>
      <img style={{width: '90%', maxWidth: '600px', margin: '20px'}} 
        src="https://marker-dev-981f2859.s3-us-west-2.amazonaws.com/0b5f9bbd6d8a9b8ead750b8905fdfd11.jpg"
        alt="Main Page Bob" />
    </div>
  )
}

export default Main