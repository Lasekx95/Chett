const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    companyName: String,
    contactName: String,
    contactNumber: String,
    salesRep: String
});

module.exports = mongoose.model('Customer', customerSchema);