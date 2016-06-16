var express = require('express');
var router = express.Router();

var https = require('https');

var API_URI = '/search/repositories?page=1&per_page=100&q=';

var options = {
  host: 'api.github.com',
  port: 443,
  path: API_URI,
  method: 'GET',
  headers: {
    'User-Agent': 'hangaebal-Exam-App'
  }
};

router.get('/', function(req, res, next) {
  if (typeof req.query.q === 'undefined') {
    res.render('github');
  } else {
    var searchText = encodeURIComponent(req.query.q);
    options.path = API_URI + searchText;
    var apiReq = https.request(options, function(apiRes) {
      var statusCode = apiRes.statusCode;
      console.log(statusCode);
      console.log(apiRes.headers);
      apiRes.setEncoding('utf8');
      var body = '';
      apiRes.on('data', function(chunk) {
        body += chunk;
      });
      apiRes.on('end', function() {
        var data = JSON.parse(body);
        res.send(data);
      });
    });
    apiReq.on('error', (e) => {
      console.log(e);
    });

    apiReq.end();
  }
});

module.exports = router;
