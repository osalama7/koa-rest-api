'use strict';

const Config = require('../../config/config.json');

let getHome = async(ctx) => {
	ctx.body = {"message": "hello, world"};
	ctx.type = 'application/json';
	return ctx;
};

let addOneItem = async (ctx) => {
	let response = {};
	ctx.type = 'application/json';
	try {
		response = await ctx.app.db.collection(ctx.querystring).insert(ctx.request.body);
		ctx.response.status = 200;
	} catch (error) {
		console.log(error)
	}
	console.log({response});
	return response;
};

let getAllItems = async(ctx) => {
	ctx.type = 'application/json';
	let collection = [];

	try {
		collection = await ctx.app.db.collection(ctx.querystring).find().toArray();
		ctx.response.status = 200;
	} catch (error) {
		console.log(error)
	}
	return collection;
};

let getOneItem = async(ctx) => {
	//fix how to select collection name in get on item
	ctx.type = 'application/json';
	let item = [];
	try {
		item = await ctx.app.db.collection('person').find({'id': ctx.params.id}).toArray(); //todo make it ultimate
		ctx.response.status = 200;
	} catch (error) {
		console.log(error)
	}

	console.log({item});
	return item;
};

let getAndUpdateItem = async (ctx) => {
	let itemId = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
	let valuesToUpdate = ctx.request.body;
	let item = await ctx.app.db.collection(ctx.querystring).updateOne(itemId, valuesToUpdate).toArray();
	return item;
};


module.exports = { getHome, addOneItem, getAllItems, getOneItem, getAndUpdateItem };

