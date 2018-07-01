const router = require('koa-router')()
router.get('/', async (ctx, next) => {
	let title = 'koa2'
    await ctx.render('index', { title })
})

module.exports = router