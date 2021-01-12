const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema ({
    companyName: String,
    contact: String,
    email: String,
    name: String,
    address: String,
    city: String,
    province: String,
    country: String,
    postalCode: String,
    hst: Boolean,
    billingNotes: String,
    serviceNotes: String,
    jargon: String,

})

module.exports = mongoose.model('Client', clientSchema)