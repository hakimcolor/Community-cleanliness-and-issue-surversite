const mongoose = require('mongoose');
const Contribution = mongoose.model(
  'Contribution',
  new mongoose.Schema({}, { strict: false }),
  'mycontribute'
);
module.exports = Contribution;
