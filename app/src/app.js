import Koa from 'koa';
import router from './routes/index.js';
import path from 'path';
import views from 'koa-views';
const app = new Koa();
//webpack 打包client代码
var webpack = require('webpack')
var webpackConfig = require('../../webpack/webpack.config.client.js')
const webpackDev  = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough;

const devMiddleware = (compiler, opts) => {
    const middleware = webpackDev(compiler, opts)
    return async (ctx, next) => {
        await middleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, next)
    }
}
const hotMiddleware = (compiler, opts) => {
    const middleware = webpackHot(compiler, opts);
    return async (ctx, next) => {
        let stream = new PassThrough()
        ctx.body = stream
        await middleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }
    
}

function bindWebpack(){
	webpackConfig.entry = Object.keys(webpackConfig.entry)
		.reduce(function (entries, name) {
			console.log(name)
			webpackConfig.entry[name].unshift('webpack-hot-middleware/client');
			return webpackConfig.entry
		})
	let compiler = webpack(webpackConfig)
	app.use(devMiddleware(compiler));
	app.use(hotMiddleware(compiler));
}
function bindStatic (){
	// 配置模板文件目录和后缀名
	app.use(views(__dirname + '/view', {
	  extension: 'ejs'
	}))

	//设置静态资源路径
	app.use(require('koa-static')(__dirname + '../../../dist'))

	//配置koa router
	app.use(router.routes())
	    .use(router.allowedMethods());
}
function startServer(){
	//监听端口
	app.listen(3000);
}
function onError (){
	app.on('error', (err) => {
	  console.error('Server error: \n%s\n%s ', err.stack || '')
	})
}

function start() {
    new Promise(function (resolve) {
            resolve();
        })
        .then(bindWebpack)
        .then(bindStatic)
        .then(startServer)
        .catch(onError);
}

start();