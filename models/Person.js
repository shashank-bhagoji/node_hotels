const mongoose = require('mongoose');

// Define the schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'], // Fixed "cheif" to "chef"
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  }
});

// Create and export the model
const Person = mongoose.model('Person', personSchema);
module.exports = Person; // ✅ Export this model so it can be used in server.js
