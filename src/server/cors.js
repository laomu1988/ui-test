/**
 * @file 允许跨域请求处理
 * @author laomu1988<laomu1988@qq.com>
 */
let headers = [
    ['Access-Control-Allow-Origin', '*'],
    ['Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'],
    ['Access-Control-Allow-Headers', 'Content-Type'],
    ['Access-Control-Max-Age', 1728000]
];

/* eslint-disable fecs-camelcase */
module.exports = async function (ctx, next) {
    headers.forEach(header => ctx.set(header[0], header[1]));
    if (ctx.method.toLowerCase() === 'options') {
        ctx.body = '';
    }
    else {
        await next();
    }
};
