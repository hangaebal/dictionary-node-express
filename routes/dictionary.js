var express = require('express');
var router = express.Router();

var https = require('https');

var CLIENT_ID = '발급받은 ID';
var CLIENT_SECRET = '발급받은 SECRET';
var API_URI = '/v1/search/encyc.xml?display=20&query=';

var options = {
  host: 'openapi.naver.com',
  port: 443,
  path: API_URI,
  method: 'GET',
  headers: {'X-Naver-Client-Id': CLIENT_ID, 'X-Naver-Client-Secret': CLIENT_SECRET}
};

router.get('/', function(req, res, next) {
  if (typeof req.query.q === 'undefined') {
    res.render('dictionary', {title: 'dic'});
  } else {
    var searchText = encodeURIComponent(req.query.q);
    options.path = API_URI + searchText;
    var apiReq = https.request(options, function(apiRes) {
      var statusCode = apiRes.statusCode;
      console.log('STATUS: ' + statusCode);
      if (statusCode === 200) {
        apiRes.setEncoding('utf8');
        apiRes.on('data', function(chunk) {
          var parseString = require('xml2js').parseString;
          parseString(chunk, function(err, result) {
            res.send(result.rss.channel[0].item);
          });
        });
      } else {
        res.status(statusCode).send('Naver API error return');
      }
    });
    apiReq.end();
  }
});

module.exports = router;
