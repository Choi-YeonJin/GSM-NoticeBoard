var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: '123456789'
    },
});

module.exports = mongoose.model('student', studentSchema);