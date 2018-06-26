const router = require('koa-router')()

router.get('/index', async (ctx, next) => {
    // ctx.type = 'text/html';
    // ctx.body = fs.createReadStream('./views/index.html');
    ctx.body = '111'
    console.log(111);
});

module.exports = router