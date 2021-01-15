
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    ip: String,
    accessAt: String,
    source: String,   
    browser: String,
});

module.exports = mongoose.model('User', UserSchema);
