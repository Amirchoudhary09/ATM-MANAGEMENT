const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let enquirySchema = new Schema({
    cardholder: { type: String, required: true },

    cardnumber: { type: String, required: true, unique: true },

    expiry: { type: String, required: true },
    cvv: { type: Number, default: null },
    
    bankname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
