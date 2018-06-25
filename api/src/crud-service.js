'use strict';

const Config = require('../../config/config.json');

let getHome = async(ctx) => {
	ctx.body = {"message": "hello, world"};
	ctx.type = 'application/json';
	return ctx;
};

let addOneItem = async (ctx) => {
	const Item = require('./schema');
	let itemToSave = new Item();
	let response = {};
	ctx.type = 'application/json';
	console.log(ctx.request.body);
	itemToSave.number = ctx.request.body.item.number;
	itemToSave.geo = [ ctx.request.body.item.location.lat, ctx.request.body.item.location.lng ];

		response = await itemToSave.save((err, saved ) => {
			if (err)
				ctx.response = err;
			console.log({saved});
		});

	ctx.response.status = 200;

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
		item = await ctx.app.db.collection('person').find({'id': ctx.params.id}).toArray();
		ctx.response.status = 200;
	} catch (error) {
		console.log(error)
	}

	return item;
};

let getItemsWithinBox = async(ctx) => {
	//fix how to select collection name in get on item
	ctx.type = 'application/json';
	let item = [ ctx.request.body.item.location.fromPoint, ctx.request.body.item.location.toPoint ];
	let result = [];
	try {
		result = await ctx.app.db.collection('person').find({
			location: { $geoWithin : { $box: [ item ] } }
		}).toArray();
		ctx.response.status = 200;
	} catch (error) {
		console.log(error)
	}

	return item;
};

let getAndUpdateItem = async (ctx) => {
	let itemId = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
	let valuesToUpdate = ctx.request.body;
	let item = await ctx.app.db.collection(ctx.querystring).updateOne(itemId, valuesToUpdate).toArray();
	return item;
};


module.exports = { getHome, addOneItem, getAllItems, getOneItem, getItemsWithinBox, getAndUpdateItem };

