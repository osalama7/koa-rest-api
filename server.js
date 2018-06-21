'use strict';

const Koa = require('koa');
const app = new Koa();
const Config = require('./config/config');
const assert = require('assert');
const mongoose = require('mongoose');

// x-response-time
app.env = 'development';

// Initialize Mongodb

app.use(async ctx => {
	console.log(ctx.db);
});

mongoose.connect(Config.mongodb.url, (error, client) => {
	if (error) {
		console.error('Please make sure Mongodb is installed and running!');
		throw error;
	}
});

app.context.db = mongoose;


app.use(async (ctx, next) => {
	const start = Date.now();
await next();
const ms = Date.now() - start;
ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
	const start = Date.now();
await next();

console.log(`${ctx.method} ${ctx.url} - ${Date.now() - start}`);
});

// response

app.use(async ctx => {
	ctx.body = 'Hello World';
});

app.listen(Config.port);