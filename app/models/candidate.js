const mongoose = require('mongoose');
const { Schema } = mongoose;

const Address = new Schema({
  street: String,
  number: String,
  neighbourhood: String,
  city: String
})

const Candidate = new Schema({
  document: String,
  name: String,
  birthday: Date,
  zipcode: String,
  email: String,
  occupation: String,
  cellphone: String,
  address: Address
});

const CandidateModel = mongoose.model('Candidate', Candidate);

module.exports = CandidateModel;
