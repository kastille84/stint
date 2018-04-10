const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    adultId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adult'
    },
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child'
    },
    mon: {
        type: Object,
        default: null
    },
    tue: {
        type: Object,
        default: null
    },
    wed: {
        type: Object,
        default: null
    },
    thu: {
        type: Object,
        default: null
    },
    fri: {
        type: Object,
        default: null
    },
    sat: {
        type: Object,
        default: null
    },
    sun: {
        type: Object,
        default: null
    },

});

module.exports = mongoose.model("Schedule", scheduleSchema);