const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceType: String,
  quantity: Number,
  price: Number,
  total: Number,
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = { Service, ServiceSchema };
