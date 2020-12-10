// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function (req, res) {
  // const ipaddress = req.connection.remoteAddress;
  const ipaddress = req.headers['sec-fetch-user'];
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  console.log(`
  ${ipaddress}
  ${language}
  ${software}
  `);
  res.json({ ipaddress, language, software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
