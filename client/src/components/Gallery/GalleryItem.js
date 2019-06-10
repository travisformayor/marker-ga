import React from 'react';

const GalleryItem = ({ card }) => {
  return(
    // <p>{card._id}</p>
    <img style={{width: '100%'}} src={card.fileUrl} alt={'Uploaded: ' + card.fileName} />
  )
}

export default GalleryItem