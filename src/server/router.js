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
    router.get('/api/test_record', getRecordList);
    router.post('/api/auto_case/enable', addCase);
    router.post('/api/auto_case/disable', removeCase);
    router.get('/api/auto_case/enable_list', getCaseList);
};

// 执行测试Case
async function runTest(ctx) {
    let body = ctx.request.body;
    let data = {errno: 0, data: {}};
    if (body.waitForResult) {
        data = await test(body);
        await pause(100);
    }
    else {
        test(body);
    }
    ctx.body = data;
}

// 增加自动测试Case
async function addCase(ctx) {
    let body = ctx.request.body;
    db.addCase(body);
    ctx.body = {errno: 0};
}

// 删除自动测试Case
async function removeCase(ctx) {
    let body = ctx.request.body;
    db.removeCase(body);
    ctx.body = {errno: 0};
}

// 增加自动测试Case
async function getCaseList(ctx) {
    let query = ctx.query || {};
    ctx.body = {
        errno: 0,
        data: db.filterCase(query)
    };
}

// 取得执行记录
function getRecordList(ctx) {
    let query = ctx.query || {};
    ctx.body = {
        errno: 0,
        data: db.filterRecord(query)
    };
}



function pause(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout || 10);
    });
}