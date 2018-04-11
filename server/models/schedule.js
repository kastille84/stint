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
        default: {}
    },
    tue: {
        type: Object,
        default: {}
    },
    wed: {
        type: Object,
        default: {}
    },
    thu: {
        type: Object,
        default: {}
    },
    fri: {
        type: Object,
        default: {}
    },
    sat: {
        type: Object,
        default: {}
    },
    sun: {
        type: Object,
        default: {}
    },

});

module.exports = mongoose.model("Schedule", scheduleSchema);