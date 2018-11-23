/**
 * @file server路由处理
 * @author muzhilong
 */
/* eslint-disable fecs-camelcase */
const test = require('./testWithRecord');
const db = require('./db');


module.exports = function (router) {
    // 执行测试Case
    router.post('/api/test', runTest);
    router.get('/api/list', getRecordList);
};


function runTest(ctx) {
    let body = ctx.request.body;
    test(body);
    ctx.body = {errno: 0, data: {}};
}


function getRecordList(ctx) {
    let query = ctx.query || {};
    ctx.body = {
        errno: 0,
        data: db.filterRecord(query)
    };
}