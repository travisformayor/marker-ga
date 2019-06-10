import React from 'react';
import CardUpload from './CardUpload';

const Build = (props) => {
  const { info: { createdDate } } = props;
  console.log('build: ', props)

  return (
    <div>
      <p>{createdDate}</p>
      <CardUpload />

    </div>
  );
};

export default Build;