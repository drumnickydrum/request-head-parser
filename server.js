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
  const r = require('ua-parser');
  const ua = r.parse(req.headers['user-agent']);
  console.log(ua);
  const ipaddress =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ipaddress.substr(0, 7) === '::ffff:') {
    ipaddress = ipaddress.substr(7);
  }
  const language = req.headers['accept-language'].split(',')[0];
  const software = ua.os.toString();
  console.log(`
  ${ipaddress}
  ${language}
  ${software}
  `);
  res.json({ ipaddress, language, software });
});

const port = process.env.PORT || 3000;
// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
