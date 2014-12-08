var fs = require('fs')
  , path = require('path')
  , User = require('../models/User');

/**
 * GET /reportes/top
 */

exports.top = function(req, res) {
  var q = User.find({
    $or:[
      {'score':null}
      , {'score': { $gt: 0}
    }]
  }).sort({}).limit(20);
  q.exec(function(err, topReporters) {
    res.render('reporters/top', {
      title: 'Top Reporters'
      , reporters: topReporters
    });
  });


};


