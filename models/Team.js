const mongoose = require('mongoose');
const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    foundationDate: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    nationalCups: {
        type: Number,
        required: true
    },
    internationalCups: {
        type: Number,
        required: true
    },
    stadiumName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Team', TeamSchema);