var fs = require('fs')
  , path = require('path');

/**
 * GET /measurement/take
 */

exports.take = function(req, res) {
  console.log('req', req.query);

  var temperature = 'unknown';

  switch (req.query.domain) {
    case 'github.com':
      temperature = 'fishily';
      break;
    case 'bashmach.koding.io':
      temperature = 'success';
      break;
    case 'www.facebook.com':
      temperature = 'danger';
      break;
  }

  res.json({'temperature': temperature, domain: req.query.domain});
};


