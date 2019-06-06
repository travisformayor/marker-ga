const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const jwt = require('jwt-simple')

// routes that don't require auth to see
router.post('/login', controllers.authCtrl.login);
router.post('/signup', controllers.authCtrl.signup);

// jwt authentication middleware

router.use( async (req, res, next) => {
  // console.log('checking auth...');
  const token = req.headers['authorization'];
  // console.log('Token received: ', token);
  if (typeof(token) !== 'undefined') {
    const openUp = await jwt.decode(token, process.env.JWT_SECRET);
    // console.log('decoded: ', openUp)
    req.userId = openUp.id;
    next();
  } else {
    res.sendStatus(403);
  }
});

router.get('/profile', controllers.authCtrl.getProfile);

// router.get('/profile', controllers.auth.profile);
// https://git.generalassemb.ly/SF-WDI/walk-it-out-back-end/tree/solution
// router.use((req, res, next) => {
//   console.log('checking auth...');
//   const bearerHeader = req.headers['authorization'];
//   console.log('triggered token check', bearerHeader);

//  if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     let verified = jwt.verify(req.token, 'waffles');
//     console.log('here is the verified', verified);
//     req.userId = verified._id; //set user id for routes to use
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// });

// routes that require auth to see
// router.get('/', controllers.user.show);

module.exports = router;