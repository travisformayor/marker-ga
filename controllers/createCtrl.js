const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const AWS = require('aws-sdk');
const sharp = require('sharp');
const md5 = require('md5');

// Database
const db = require('../models');

// AWS S3 Init
const config = {
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION
};
const S3 = new AWS.S3(config);

// Misc
const genericError = "Something went wrong, please try again";

// Routes ======================================= //
module.exports = {
  // Upload image API
  uploadImage: async (req, res) => {
    // 'app.use(fileUpload...' middleware in server.js aborts on files to large before getting here
    if (!req.files) {
      return res.status(400).json({
        alerts: [{message: 'No file uploaded', type: 'upload', status: 'error'}],
      });
    }
    const { file } = req.files;
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      // File is jpg or png, great!
      // console.log('mime type is: ', file.mimetype);
      // console.log('md5 hash of file: ', file.md5);
      // Rename file to its md5 hash, keeping its mimetype extension
      const fileExt = (file.mimetype === 'image/jpeg') ? 'jpg' : 'png'
      const fileName = `${file.md5}.${fileExt}`;
      const microName = `${file.md5}_micro.${fileExt}`;
      // Define the upload info. file.data is a stream of the file contents

      const sssSend = async (fileName, fileData, fileHash) => {
        const objectParams = {Bucket: 'marker-dev-981f2859', ACL: 'public-read', Key: fileName, Body: fileData};
        const uploadedFile = await S3.putObject(objectParams).promise();
        if (uploadedFile.ETag) {
          // The ETag is returned by the upload if it thinks it was successful
          // The ETag is an md5 hash of the file, so we can check that against what we have to confirm
          // ETag is returned with leading and trailing quotes ("), so strip them off with .replace
          const fileETag = uploadedFile.ETag.replace(/"/g, '');
          // console.log("The returned ETag: ", fileETag)
          // console.log("The files md5 hash: ", fileHash)
          // console.log("Do they equal? ", (fileETag === fileHash ? true : false))
          
          if (fileETag === fileHash) {
            // ToDo: switch this path  to an env variable, for different buckets on different deploys
            const filePath = `https://marker-dev-981f2859.s3-us-west-2.amazonaws.com/${fileName}`
            // return res.status(200).json({
            const success = {
              alerts: [{
                message: 'Upload successful', 
                type: 'upload', 
                status: 'info',
                fileName, 
                filePath,
              }],
            };
            return success;
          } else {
            // The hash returned by AWS does not match the file we received
            // Upload was potentially cut off or corrupted in some way
            return res.status(500).json({
              alerts: [{message: 'Error uploading file. Please try again', type: 'upload', status: 'error'}], 
            });
          }
        } else {
          // The response didn't include the ETag md5 hash
          // The upload failed to complete in some unexpected way
          return res.status(500).json({
            alerts: [{message: 'Error uploading file. Please try again', type: 'upload', status: 'error'}], 
          });
        }
      }
      
      try {
        // Attempt to upload the file
        // ToDo: switch bucket name to an env variable, for different buckets on different deploys

        // send main image
        const uploadedFile = await sssSend(fileName, file.data, file.md5);
        // create and send micro thumbnail
        const microThumbnail = await sharp(file.data).resize(30, 40).toBuffer();
        const uploadedMicro = await sssSend(microName,  microThumbnail, md5(microThumbnail)); 

        const updatedMicro = { alerts: [{
          ...uploadedMicro.alerts[0],
          type: 'upload-micro',
        }]};
        uploadedFile.alerts.push(...updatedMicro.alerts)
        // console.log('info on both files: ', uploadedFile);
        
        return res.status(200).json(uploadedFile);
      } catch (err) {
        // Something went wrong
        console.error(err, err.stack);
        return res.status(500).json({
          alerts: [{message: genericError, type: 'upload', status: 'error'}], 
          errData: err,
        });
      }
    } else {
      return res.status(400).json({
        alerts: [{message: 'Unsupported file type', type: 'upload', status: 'error'}],
      });
    }
  },
  getDrafts: async (req, res) => {
    // ${endpoint}/create/drafts
      try {
        const data = await db.Draft.find({user_id: req.userId})
        // return res.status(200).json({success: 'success', foundUser})
        return res.status(200).json({success: 'success', foundDraft});
      } catch (err) {
        return res.status(500).json({status: 500, alerts: [{message: genericError, type: 'main', status: 'error'}]});
      }
    },

  },
  
  //saveCard:
  // Save a card (new card or updating an existing card)
  // Save it as draft or as submit status

  //deleteCard:
  // Delete a draft card
  // card status has to be draft

  //getCards:
  // Get all cards the user is artist for
  // draft cards as well as submitted cards
  
  //getCard:
  // Potentially not needed right now, all cards gets the same info at not much extra cost
  // Get all the info a single card a user is working on
  // card status has to be draft
}