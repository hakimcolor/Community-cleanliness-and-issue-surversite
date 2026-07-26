const mongoose = require('mongoose');
const Issue = mongoose.model(
  'Issue',
  new mongoose.Schema({}, { strict: false }),
  'AllIssue'
);
module.exports = Issue;
