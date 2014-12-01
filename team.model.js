var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  id: {type: Number, unique: true, required: true},
  name: String,
  type: String,
  featured: Boolean,
  country: String,
  city: String,
  stadium: String,
  capacity: Number
});

module.exports = mongoose.model('Teams', TeamSchema);
