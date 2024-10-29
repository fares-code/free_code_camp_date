// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// serve static files from the public directory
app.use(express.static('public'));

// routing for the home page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// current date/time API
app.get('/api', (req, res) => {
  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString()
  });
});

// timestamp API
app.get('/api/:timestamp', (req, res) => {
  const timestamp = req.params.timestamp;

  // Check if the timestamp is a number and has a length of 13 (milliseconds)
  if (!isNaN(timestamp) && timestamp.length === 13) {
    return res.json({
      unix: Number(timestamp),
      utc: new Date(Number(timestamp)).toUTCString()
    });
  }

  // Check if the timestamp can be parsed into a valid date
  const date = new Date(timestamp);
  if (date.toString() !== "Invalid Date") {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  // If none of the above conditions were met, respond with an error
  res.json({ error: "Invalid Date" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
