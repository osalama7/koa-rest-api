'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
	number:  String,
	location: {
		type: [Number],
		index: '2d'
	}
});

module.exports = mongoose.model('Item', ItemSchema);