import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GalleryItem from './GalleryItem';
import AxiosModel from '../../models/axios';

// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import CardUpload from './CardUpload';
// import Button from '@material-ui/core/Button';
// const moment = require('moment');

const useStyles = makeStyles(theme => ({
  galleryHolder: {
    margin: '10px 10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  galleryItem: {
    width: '200px',
    height: '267px',
    margin: '5px',
  }
}));

const Gallery = () => {
  const classes = useStyles();
  const [cards, setCards ] = useState([]);

  const getCards = async () => {
    try {
      const response = await AxiosModel.getCards();
      console.log('card response: ', response.data.allCards);

      setCards(response.data.allCards)

      // const { foundUser } = response.data
      // setUserInfo({
      //   loggedIn: true,
      //   user: foundUser
      // });
      // console.log('user state here:', userInfo)
    } catch(err) {
      // console.log('err.response', err.response);
      // setAlerts(err.response.data.alerts);
      // setAlerts(err.response.data.alerts);
    }
  }

  useEffect(() => {
    getCards();
  },[])

  return (
    <div className={classes.galleryHolder} >
      {cards.map((card, index) => (
        <div className={classes.galleryItem} key={'gallery-item'+index} >
          <GalleryItem card={card} />
        </div>
      ))}
    </div>
  )
};

export default Gallery;