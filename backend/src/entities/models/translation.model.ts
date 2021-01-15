
import * as express from 'express';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TranslationSchema = Schema({
    translatedText: String,
    inputLng: String,
    outputLng: String,
    translateTextLenght: Number,
    translateAt: String,
});

module.exports = mongoose.model('Translation', TranslationSchema);