const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  tower: String,
  flatNumber: String,
  phone: String,
  residentType: String,
  selectedActivities: [String],
  specifics: Object,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);