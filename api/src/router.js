
const Router = require('koa-router');
const CrudModule = require('./crud-service');
let router = new Router();


module.exports = router
		.get('/', async (ctx, next) => {
			ctx.body = await CrudModule.getHome(ctx);
		})
		.post('/item', async (ctx, next) => {
			ctx.body = await CrudModule.addOneItem(ctx);
		})
		.get('/item/:id', async (ctx, next) => {
			ctx.body = await CrudModule.getOneItem(ctx);
		})
		.get('/items', async (ctx, next) => {
			ctx.body = await CrudModule.getAllItems(ctx);
		})
		.put('/item/:id', async (ctx, next) => {
			ctx.body = await CrudModule.getAndUpdateItem(ctx);

});