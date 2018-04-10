const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
    adultId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adult'
    },
    name: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Child', childSchema);