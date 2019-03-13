'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Fruit = new Schema({
    name: String,
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Fruit', Fruit);
