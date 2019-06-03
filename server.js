const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// Setup server port or the localhost dev port
const PORT = process.env.PORT || 5000;
// Middleware ==================== //
// cors
// body parser

// React Static Build Files ====== //
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API Endpoints ================= //
// Put all API endpoints under '/api/v1'
// app.get...
app.get('/api/v1/test', (req, res) => {
  const count = 5;

  var testOut = [];
  for (var i = 1; i <= count; i++) {
     testOut.push(i);
  }
  res.json(testOut);
  console.log(`Sent ${count} array`);
});

// Catchall Handler ============== //
// For any request that isn't above, return React built index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Server ================== //
app.listen(PORT, () => console.log(`Server started on port: ${PORT}.`));