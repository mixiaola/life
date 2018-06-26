import Koa from 'koa';
import router from './routes/index.js';
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Wise Wrong';
});
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);