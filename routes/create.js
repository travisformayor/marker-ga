const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const jwt = require('jwt-simple')


// Routes
// router.use( async (req, res, next) => {
//   console.log('just passing through')
//   console.log(req.body);
//   next();
// })

router.get('/cards', controllers.createCtrl.getCards); // Get all cards
router.get('/deletedraft/:id', controllers.createCtrl.deleteDraft);
router.post('/updatedraft/:id', controllers.createCtrl.updateDraft);
router.post('/submit/:id', controllers.createCtrl.submitCard);

// JWT Authentication Middleware ================ //
router.use( async (req, res, next) => {
  // console.log('checking token in create...');
  // console.log('header info: ', req.headers);
  // console.log('body: ', req);
  const token = req.headers['authorization'];
  // console.log('Token received: ', token);
  if (typeof(token) !== 'undefined') {
    const openUp = await jwt.decode(token, process.env.JWT_SECRET);
    // console.log('decoded: ', openUp)
    req.userId = openUp.id;
    next();
  } else {
    return res.status(403).json({
      alerts: [{message: 'Login Required', type: 'main', status: 'error'}],
    });
  }
});

// Routes that need auth to access
router.post('/uploadimage', controllers.createCtrl.uploadImage); // Upload an image
router.post('/draft', controllers.createCtrl.newDraft); // Create a new draft
router.get('/drafts', controllers.createCtrl.getDrafts); // Get all drafts for user
// router.post('/savecard', controllers.createCtrl.saveCard); // Save the card
// router.post('/delcard', controllers.createCtrl.deleteCard); // Delete a draft card
// router.post('/cards', controllers.createCtrl.getCards); // Get info on all the cards
// router.post('/card', controllers.createCtrl.getCard); // Get info on a card

module.exports = router;