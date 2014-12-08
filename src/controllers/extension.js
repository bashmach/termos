var fs = require('fs')
  , path = require('path')
  , _ = require('lodash')
  , querystring = require('querystring');

/**
 * GET /extension/updates.xml
 */

exports.updates = function(req, res) {
  console.log('req', req.query);

  var params = {}
    , throwNotFound = function(err) {
       return res.status(404)        // HTTP status 404: NotFound
         .send('Not found')
         .end();
    }
    , filepath;

  if (_.isString(req.query.x)) {
    params = querystring.parse(req.query.x);
  }

  if (_.isNumber(params.v)) {
    return throwNotFound('Not found current version');
  }

  console.log('params', params);

  res.set('Content-Type', 'text/xml');
  res.render('extension/updates', {
    version: params.v,
    id: params.id
  });
  //
  //filepath = path.join(__dirname, '/../../') + '/extension/updates.xml';
  //
  //fs.readFile(filepath, function(err, buf) {
  //  if (err) {
  //    return throwNotFound(err);
  //  }
  //
  //
  //
  //  res.set('Content-Type', 'text/xml');
  //  res.send(buf.toString('utf-8'));
  //  res.end();
  //});
};

exports.load = function(req, res) {
  var filename = 'termos-'+req.params.version+'.crx';
  var filepath = path.join(__dirname, '/../../') + '/extension/package/' + filename;

  console.log('req', req.params);

  fs.exists(filepath, function(exists) {
    if (!exists) {
      return res.status(404)        // HTTP status 404: NotFound
        .send('Not found')
        .end();
    }

    res.sendfile(filepath);
  });
};




