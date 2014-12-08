var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var domainSchema = new mongoose.Schema({
  domain: { type: String, lowercase: true },
  points: { type: Number, default: 0 }
});

domainSchema.pre('save', function(next) {
  next();
});

domainSchema.methods.getTemperature = function() {
  if (!this.domain) {
    return 'unknown';
  }

  if (0 === this.points) {
    return 'cold';
  }

  if (0 > this.points) {
    return 'danger';
  }

  return 'success';
}

domainSchema.methods.getResolution = function() {
  switch (this.getTemperature()) {
    case 'success':
      return 'Termos Community approves this website';
      break;
    case 'cold':
      return 'Termos Community is indifferent to this website';
      break;
    case 'danger':
      return 'Termos Community warns about this website';
      break;
    default:
      return 'Termos Community don\'t know this website';
      break;
  }
  return 'Termos Community approves this website';
}

module.exports = Domain  = mongoose.model('Domain', domainSchema);

