'use strict';

const Koa = require('koa');
const BodyParser = require("koa-bodyparser");

const app = new Koa();
const router = require('./api/src/router');
const Config = require('./config/config');


app.env = 'dev';

//attaching mongodb connection
require("./bin/src/mongo-adapter")(app);

app.use(BodyParser());
// Add routing
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

module.exports = { app } ;