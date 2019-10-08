import React, { useState, useEffect } from 'react';

const GalleryItem = ({ card }) => {
  const [currentImage, setImage ] = useState(card.microUrl);
  const [loading, setLoading ] = useState(true);

  const loadImage = src => {
    const image = new Image()
    image.onload = () => {
      setImage(src)
      setLoading(false)
    }
    image.src = src
  }

  useEffect(() => {
    loadImage(card.fileUrl);
  },[card.fileUrl])

  const style = loadingStatus => {
    return {
      width: '100%',
      transition: '0.5s filter linear',
      filter: `${loadingStatus ? 'blur(10px)' : ''}`,
    }
  }

  return(
    <img style={style(loading)} src={currentImage} alt={'Uploaded: ' + card.fileName} />
  )
}

export default GalleryItem