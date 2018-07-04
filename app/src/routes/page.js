const router = require('koa-router')()
//首页入口
router.get('/', async (ctx, next) => {
	if (ctx.cookies.get('isLogin')){
		await next()
	} else {
		await ctx.render('login')
	}
}, async (ctx, next) => {
	let title = 'koa2'
    await ctx.render('index')
})

//登录页面入口
router.get('/pagelogin', async (ctx, next) => {
	let title = 'koa2'
    await ctx.render('login')
})

module.exports = router