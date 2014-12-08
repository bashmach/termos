var fs = require('fs')
  , path = require('path')
  , User = require('../models/User')
  , Report = require('../models/Report');

/**
 * POST /report
 */

exports.postReport = function(req, res) {
  var report = new Report();
  report.domain = req.body.domain;
  report.url = req.body.url;
  report.text = req.body.text;
  report.user = {
    id: req.user.twitter
    , picture: req.user.profile.picture
    , name: req.user.profile.name
  };
  report.action = req.body.action;

  report.save(function(err) {
console.log('report', req.user, report, err);
    if (err) {
      return res.json({error: err});
    } else {
      return res.json({success: 'ok'})
    }
  });
};


