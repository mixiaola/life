const router = require('koa-router')()
const fs = require('fs')
const path = require('path');
router.get('/', async (ctx, next) => {
	let title = 'koa2'
    await ctx.render('index', { title })
})
router.get('/index', async (ctx, next) => {
    // ctx.type = 'text/html';
    // ctx.body = fs.createReadStream('./views/index.html');
    ctx.body = '111'
    console.log(111);
});

module.exports = router