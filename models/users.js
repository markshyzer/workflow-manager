const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    admin: {
        type: Boolean, default: true
    },
    email: String,
    name: String,
    address: String,
    city: String,
    province: String,
    country: String,
    postalCode: String,
    timeZone: String,
    rate: Number,
    hstNumber: String,
    googleId: String
})

module.exports = mongoose.model('User', userSchema)