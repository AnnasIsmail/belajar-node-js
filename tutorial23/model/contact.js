const mongoose = require('mongoose');

//Membuat Schema
const contact = mongoose.model('Contact', {
    nama: {
        type: String,
        required: true
    },
    notelp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

module.exports = contact