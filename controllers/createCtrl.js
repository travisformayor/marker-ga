const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple')

// Database
const db = require('../models');

// Misc
const genericError = "Something went wrong, please try again";

// Routes ======================================= //
module.exports = {
  // Upload image API
  uploadImage: async (req, res) => {
    // 'app.use(fileUpload...' middleware in server.js aborts on files to large before getting here
    if (!req.files) {
      return res.status(400).json({status: 400, alerts: [{message: 'No file uploaded', type: 'upload'}]});
    } 
    const { file } = req.files;
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      // File is jpg or png, great!
      console.log('mime type is: ', file.mimetype);
      console.log('md5 hash of file: ', file.md5);
      // Rename file to its md5 hash, keeping its mimetype extension
      const fileName = (file.mimetype === 'image/jpeg') ? `${file.md5}.jpg` : `${file.md5}.png`
      // Define the upload info. file.data is a stream of the file contents
      // ToDo: switch bucket name  to an env variable, for different buckets on different deploys
      const objectParams = {Bucket: 'marker-dev-981f2859', ACL: 'public-read', Key: fileName, Body: file.data};
      try {
        // Attempt to upload the file
        const uploadedFile = await S3.putObject(objectParams).promise();
        if (uploadedFile.ETag) {
          // The ETag is returned by the upload if it thinks it was successful
          // The ETag is an md5 hash of the file, so we can check that against what we have to confirm
          // ETag is returned with leading and trailing quotes ("), so strip them off with .replace
          const fileETag = uploadedFile.ETag.replace(/"/g, '');
          console.log("The returned ETag: ", fileETag)
          console.log("The files md5 hash: ", file.md5)
          console.log("Do they equal? ", (fileETag === file.md5 ? true : false))
          
          if (fileETag === file.md5) {
            // ToDo: switch this path  to an env variable, for different buckets on different deploys
            const filePath = `https://marker-dev-981f2859.s3-us-west-2.amazonaws.com/${fileName}`
            return res.status(200).json({msg: 'Upload successful', fileName, filePath});
            return res.status(200).json({alerts: [{message: 'No file uploaded', type: 'upload'}]});
          } else {
            // The hash returned by AWS does not match the file we received
            // Upload was potentially cut off or corrupted in some way
            return res.status(500).json({msg: 'Error uploading file. Please try again'})
          }
        } else {
          // The response didn't include the ETag md5 hash
          // The upload failed to complete in some unexpected way
          return res.status(500).json({msg: 'Error uploading file. Please try again'})
        }
      } catch (err) {
        // Something went wrong
        console.error(err, err.stack);
        return res.status(500).json({msg: genericError, alertData: err})
      }
    } else {
      return res.status(400).json({msg: 'Unsupported file type'})
    }
  },

  // ==== End of copy from file upload ========== //

  // Save a card (new card or updating an existing card)
  // Save it as draft or as submit status
  //saveCard:

  // Delete a draft card
  // card status has to be draft
  //deleteCard:

  // Get all cards the user is artist for
  // draft cards as well as submitted cards
  //getCards:
  
  // Potentially not needed right now, all cards gets the same info at not much extra cost
  // Get all the info a single card a user is working on
  // card status has to be draft
  //getCard:
  // =========== Examples from Auth ============= //
  // signup: async (req,res) => {
  //   const { username, email, password, password2 } = req.body;
  //   // console.log(req.body)
    
  //   // Validation
  //   const alerts = [];
  //   if (!username) alerts.push({message: 'Please enter a username', type: 'username'});
  //   if (!email) alerts.push({message: 'Please enter your email', type: 'email'});
  //   if (!password) alerts.push({message: 'Please enter your password', type: 'password'});
  //   if (password !== password2) alerts.push({message: 'Your passwords do not match', type: 'password2'});
  //   // If alerts, respond with alerts array
  //   if (alerts.length) return res.status(400).json({status: 400, alerts});
    
  //   try {
  //     // Check for existing user account
  //     const emailExists = await db.User.findOne({email}); // {email: email}
  //     if (emailExists) return res.status(400).json({status: 400, alerts: [{message: 'Email already used', type: 'email'}]});
  //     const usernameExists = await db.User.findOne({username}); // {username: username}
  //     if (usernameExists) return res.status(400).json({status: 400, alerts: [{message: 'Username already used', type: 'username'}]});

  //     // Salt and Hash user password
  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     // Create new user object
  //     const newUser = {
  //       username,
  //       email,
  //       password: hashedPassword,
  //     };
  //     // Add new user to db
  //     const addedUser = await db.User.create(newUser);

  //     // Send success
  //     // return res.sendStatus(200); // if its only a status response, .sendStatus instead of .status
  //     const userPayload ={
  //       username: addedUser.username,
  //       id: addedUser._id
  //     };
  //     const token = await jwt.encode(userPayload, process.env.JWT_SECRET);

  //     return res.status(200).json({status: 200, success: 'success', user: userPayload, token});
  //   } catch (err) {
  //     // console.log(err);
  //     return res.status(500).json({status: 500, alerts: [{message: genericError, type: 'extra'}]});
  //   }
  // },
}