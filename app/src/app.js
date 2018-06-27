import Koa from 'koa';
import router from './routes/index.js';
const app = new Koa();
const views = require('koa-views');

// 配置模板文件目录和后缀名
app.use(views(__dirname + '/view', {
  extension: 'ejs'
}))
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);