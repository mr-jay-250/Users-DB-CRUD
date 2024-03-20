const mongoose = require('mongoose');

// Schema - 1st step
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  }
},
{ timestamps: true }
);

// Model - 2nd step
const User = mongoose.model('user', userSchema);

module.exports = User;