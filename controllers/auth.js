const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple')

// Database
const db = require('../models');

// Misc
const genericError = "Something went wrong, please try again";

// Routes ================================== //
module.exports = {
  signup: async (req,res) => {
    const { username, email, password, password2 } = req.body;
    console.log(req.body)
    const errors = [];

    // Validation
    if (!username) errors.push({message: 'Please enter a username'});
    if (!email) errors.push({message: 'Please enter your email'});
    if (!password) errors.push({message: 'Please enter your password'});
    if (password !== password2) errors.push({message: 'Your passwords do not match'});

    // If errors, respond with errors array
    if (errors.length) return res.status(400).json({status: 400, errors});
    
    try {
      // Check for existing user account
      const emailExists = await db.User.findOne({email}); // {email: email}
      if (emailExists) return res.status(400).json({status: 400, errors: [{message: 'Email already used'}]});
      const usernameExists = await db.User.findOne({username}); // {username: username}
      if (usernameExists) return res.status(400).json({status: 400, errors: [{message: 'Username already used'}]});

      // Salt and Hash user password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user object
      const newUser = {
        username,
        email,
        password: hashedPassword,
      };
      // Add new user to db
      const addedUser = await db.User.create(newUser);

      // Send success
      // return res.sendStatus(200); // if its only a status response, .sendStatus instead of .status
      const userPayload ={
        username: addedUser.username,
        id: addedUser._id
      };
      const token = await jwt.encode(userPayload, process.env.JWT_SECRET);

      return res.status(200).json({status: 200, success: 'success', user: userPayload, token});
    } catch (err) {
      console.log(err);
      return res.status(500).json({status: 500, errors: [{message: genericError}]});
    }
  },
  login: async (req,res) => {
    const { username, password } = req.body;
    // Validation
    if(!username || !password) return res.status(400).json({
      status: 400, 
      errors: [{message: 'Please enter your username and password'}]
    });

    try {
      // Find user by username
      const foundUser = await db.User.findOne({username}); // {username: username}
      // if user not found return error
      if (!foundUser) return res.status(404).json({
        status: 404,
        errors: [{message: 'Username or Password is incorrect'}]
      });

      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      // Return error if passwords do not match
      if (!passwordMatch) return res.status(400).json({
        status: 400,
        errors: [{message: 'Username or Password is incorrect'}]
      });

      // Passwords match
      console.log("Match: ", passwordMatch)
      // create a json web token
      const userPayload ={
        username: foundUser.username,
        id: foundUser._id
      };
      const token = await jwt.encode(userPayload, process.env.JWT_SECRET);

      return res.status(200).json({status: 200, success: 'success', user: userPayload, token});
    } catch (err) {
      console.log(err);
      return res.status(500).json({status: 500, errors: [{message: genericError}]});
    }
  },
  getProfile: async (req,res) => {
    console.log('in the profile get route');
    console.log('the user id is: ', req.userId);

    const foundUser = await db.User.findById(req.userId, {password: 0, __v: 0}); // filter off the password and version
    if (!foundUser) return res.status(400).json({status: 400, errors: [{message: 'Invalid user error. Logout and try again.'}]});
    console.log('Found user: ', foundUser);
    return res.status(200).json({status: 200, success: 'success', foundUser})
  },
}

// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await db.User.findById(userId, {password: 0, __v: 0}); // filter off password, email, and version
//     if (!user) return res.status(400).json({status: 400, errors: [{message: 'User not found'}]});

//     const userPosts = await db.Post.find({user_id: userId})
//       .populate({ path: 'user_id', select: 'name'}) // add in the user's name to the user_id property in the post data
//       .exec(); // tells mongoose to finish what its doing once .populate is done

//     res.json({user, userPosts});
  
//   } catch(err) {
//     console.log(err);
//     return res.status(500).json({status: 500, errors: [{message: genericError}]});
//   }
// });
