'use strict';

const MongoClient = require('mongodb').MongoClient;
const Config = require('../../config/config.json');


module.exports = async (app) => {
	try {
		app.connection = await MongoClient.connect(`${Config.mongodb.url}/${Config.mongodb.dbName}`); //todo reafactor to simpler
		app.db = await app.connection.db();
		console.log(`Connected to mongodb`);
	} catch (error) {
		console.log(`failed to connect to mongodb ${error}`);
	}

};