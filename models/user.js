const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});


exports.User = mongoose.model('User', userSchema)