var express = require('express');
var router = express.Router();

var https = require('https');

var CLIENT_ID = '발급받은 ID';
var CLIENT_SECRET = '발급받은 SECRET';
var API_URI = '/v1/search/encyc.xml?query=';

var options = {
  host: 'openapi.naver.com',
  port: 443,
  path: API_URI,
  method: 'GET',
  headers: {'X-Naver-Client-Id':CLIENT_ID, 'X-Naver-Client-Secret': CLIENT_SECRET}
};

router.get('/', function(req, res, next) {
  var searchText = encodeURIComponent('개발');
  options.path = API_URI + searchText;
  var apiReq = https.request(options, function(apiRes) {
    console.log('STATUS: ' + apiRes.statusCode);
    apiRes.setEncoding('utf8');
    apiRes.on('data', function (chunk) {
      res.setHeader('Content-Type', 'application/xml');
      res.send(chunk);
    });
  });
  apiReq.end();
});

module.exports = router;
