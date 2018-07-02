const router = require('koa-router')()
router.get('/', async (ctx, next) => {
	let title = 'koa2'
    await ctx.render('index', { title })
})
router.get('/pagelogin', async (ctx, next) => {
	let title = 'koa2'
    await ctx.render('login', { title })
})

module.exports = router