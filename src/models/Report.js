var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Domain = require('./Domain');

var reportSchema = new mongoose.Schema({
  domain: { type: String, lowercase: true },
  url: { type: String, lowercase: true },
  text: { type: String },
  points: { type: String, default: 0 },
  user: {
    id: {type: String, default: ''},
    picture: {type: String, default: ''},
    name: {type: String, default: ''}
  },
  action: { type: String, lowercase: true }
});

reportSchema.pre('save', function(next) {
  var report = this;

  var q = Domain.where({domain: report.domain});
  q.findOne(function(err, domain) {
    if (err || !domain) {
      domain = new Domain();
      domain.domain = report.domain;
      domain.points = 0;
    }

    if (report.action == 'like') {
      domain.points = domain.points + 10;
    } else if (report.action == 'dislike') {
      domain.points = domain.points - 10;
    }

    domain.save(function() {
      next();
    })
  });
});

reportSchema.methods.getContext = function(action) {
  var classes = 'list-group-item list-group-item-';

  switch (action) {
    case 'dislike':

      return classes+'danger';
    case 'like':
      return classes+'success';
      break;
    default:
      return classes+'default';
      break;
  }
};

module.exports = Report = mongoose.model('Report', reportSchema);

