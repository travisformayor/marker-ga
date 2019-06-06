const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
// Setup server port or the localhost dev port
const PORT = process.env.PORT || 5000;

// Middleware ========================= //
// dotenv
require('dotenv').config()

// cors

// Express File Upload
app.use(fileUpload({
  // https://www.npmjs.com/package/express-fileupload
  limits: { fileSize: 3 * 1024 * 1024 }, // max file size in bytes. First number is mb
  safeFileNames: true, // strip off any hinky characters from the filename
  preserveExtension: 4, // max length the .ext can be (.jpeg, .png, etc)
  abortOnLimit: true, // return a response of 413 of over file size limit
}));

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// React Static Build Files =========== //
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API Endpoints ====================== //
// Put all API endpoints under '/api/v1'

// Controller Routes ================== //
const routes = require('./routes');
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/create', routes.create);

// Catchall Handler =================== //
// // For any request that isn't above, return React built index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// Server ============================= //
app.listen(PORT, () => console.log(`Server started on port: ${PORT}.`));