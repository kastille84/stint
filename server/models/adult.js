const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    },
    password: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    children: {
        type: Array,
        default: []
    },
    verifyHash: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Adult", schema);