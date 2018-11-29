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
const timer = require('./server/timer');
const time = require('./utils/time');

require('log-timestamp')(function () {
    return '[' + time.datetime(new Date()) + '] %s';
});

const app = new Koa();
const router = new Router();
app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.href);
    try {
        await next();
    }
    catch (err) {
        console.log('ServerError:', err);
        ctx.body = {errno: 400, errmsg: err.message, stack: err.stack};
    }
});
app.use(cros);
app.use(serve(config.dir));
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
        let interval = setInterval(timer, 20 * 1000);
        console.log('start check timer');
        timer();
    }
});
