var fs = require('fs')
  , path = require('path')
  , Domain = require('../models/Domain');

/**
 * GET /measurement/take
 */

exports.take = function(req, res) {
  Domain.findOne({domain: req.query.domain}).exec(function(err, domain) {
    if (err) {
      return res.status(404)        // HTTP status 404: NotFound
        .send('Not found')
        .end();
    }

    if (!domain) {
      domain = new Domain();
    }

    res.json({'temperature': domain.getTemperature(), domain: req.query.domain});
  });


};


