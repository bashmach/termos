var fs = require('fs')
  , path = require('path')
  , User = require('../models/User')
  , Report = require('../models/Report');

/**
 * GET /scan
 */

exports.scan = function(req, res) {

  var q = Report.find({'domain':req.params.domain}).sort({});
  q.exec(function(err, reports) {
    console.log('reports', reports);

    res.render('scan/results', {
      title: 'Reviews of ' + req.params.domain
      , domain: req.params.domain
      , reports: reports
      , schema: new Report()
    });
  });


};

exports.postScan = function(req, res) {

  res.redirect('/scan/'+req.body.domain);

};

