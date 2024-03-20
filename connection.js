const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoDb = async (url) => {
  return mongoose.connect(url)
}

module.exports = { connectMongoDb }