var fs = require('fs')
  , path = require('path')
  , User = require('../models/User')
  , Domain = require('../models/Domain')
  , Report = require('../models/Report');

/**
 * GET /scan
 */

exports.scan = function(req, res) {

  Domain.findOne({domain: req.params.domain}).exec(function(err, domain) {
    if (err) {
      return res.status(404)        // HTTP status 404: NotFound
        .send('Not found')
        .end();
    }

    if (!domain) {
      domain = new Domain();
    }

    var q = Report.find({'domain':req.params.domain}).sort({});
    q.exec(function(err, reports) {
      console.log('reports', reports);

      res.render('scan/results', {
        title: 'Reviews of ' + req.params.domain
        , requestDomain: req.params.domain
        , domain: domain
        , reports: reports
        , schema: new Report()
      });
    });
  })




};

exports.postScan = function(req, res) {

  res.redirect('/scan/'+req.body.domain);

};

