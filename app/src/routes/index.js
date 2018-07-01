import login from '../controller/login';

const router = require('koa-router')()
router.get('/login', login.login);

router.get('/', async (ctx, next) => {
	let title = 'koa2'
    await ctx.render('index', { title })
})

module.exports = router