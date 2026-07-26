const mongoose = require('mongoose');
const MyIssue = mongoose.model(
  'MyIssue',
  new mongoose.Schema({}, { strict: false }),
  'myissues'
);
module.exports = MyIssue;
