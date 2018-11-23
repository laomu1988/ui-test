/**
 * @file 启动server服务，监听执行Case请求
 * @author muzhilong
 */
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const serve = require('koa-static');
const cros = require('./server/cors');
const config = require('./config');
const apis = require('./server/router');

const app = new Koa();
const router = new Router();
app.use((ctx, next) => {
    console.log(ctx.method, ctx.href);
    return next();
});
app.use(serve(config.tempDir));
app.use(cros);
app.use(koaBody(config.bodyOptions));
apis(router);
app.use(router.routes());

app.use(ctx => {
    if (ctx.method.toLowerCase() === 'options') {
        return ctx.body = {};
    }
    ctx.status = 404;
    ctx.body = 'Not Found';
});

app.listen(config.port, function (err) {
    if (err) {
        console.error('start app err:', err);
    }
    else {
        console.log('start app at: http://localhost:' + config.port);
    }
});
