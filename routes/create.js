const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
// const jwt = require('jwt-simple')

// ToDo: enable routes requiring auth to create cards
// Note: Hide the create nav button when not logged in, deny the route, don't allow api calls
router.post('/uploadimage', controllers.createCtrl.uploadImage); // Upload an image
// router.post('/savecard', controllers.createCtrl.saveCard); // Save the card
// router.post('/delcard', controllers.createCtrl.deleteCard); // Delete a draft card
// router.post('/cards', controllers.createCtrl.getCards); // Get info on all the cards
// router.post('/card', controllers.createCtrl.getCard); // Get info on a card

// Example from auth routes
// // jwt authentication middleware
// router.use( async (req, res, next) => {
//   // console.log('checking auth...');
//   const token = req.headers['authorization'];
//   // console.log('Token received: ', token);
//   if (typeof(token) !== 'undefined') {
//     const openUp = await jwt.decode(token, process.env.JWT_SECRET);
//     // console.log('decoded: ', openUp)
//     req.userId = openUp.id;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// });

// router.get('/profile', controllers.auth.getProfile);

module.exports = router;