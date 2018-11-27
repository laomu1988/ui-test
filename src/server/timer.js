/**
 * @file 测试Case定时执行
 * @author laomu1988
 */
/* eslint-disable fecs-camelcase */
const request = require('request');
const config = require('../config');
const db = require('./db');
const test = require('./testWithRecord');

const tasks = [];
const runningTasks = [];

// 检查定时case，并将需要执行的定时case放入tasks列表中
module.exports = function check() {
    if (tasks.length === 0) {
        let now = Date.now();
        db.cases
            .filter(v => !v.is_running)
            .filter(v => !v.test_time || (v.test_time - now >= v.interval * 1000))
            .forEach(v => tasks.push(v));
        console.log('New Tasks:', tasks.length);
    }
    else {
        console.log('Has Tasks:', tasks.length);
    }
    testCases();
};

// 多进程同时执行定时任务
async function testCases() {
    while (runningTasks.length < config.maxInstance && tasks.length > 0) {
        let one = tasks.shift();
        if (!one) {
            break;
        }
        runningTasks.push(one);
        testOne(one)
            .then(() => {
                let index = runningTasks.indexOf(one);
                if (index >= 0) {
                    runningTasks.splice(index, 1);
                }
                testCases();
            })
            .catch(err => {
                console.error('RunCaseError', err);
                let index = runningTasks.indexOf(one);
                if (index >= 0) {
                    runningTasks.splice(index, 1);
                }
                testCases();
            });
    }
}


async function testOne(auto) {
    let error = null;
    console.log('run task:', auto.id);
    auto.is_running = true;
    try {
        auto.test_time = Date.now();
        let res = await getAutoCase(auto);
        let data = res.data;
        console.log('caseData:', data);
        if (!data.id) {
            db.pushRecord(Object.assign({}, auto, {status: -1, errmsg: '加载远程服务数据失败'}));
            throw new Error('加载远程服务数据失败');
        }
        let filledAttr = ['name', 'interval', 'email', 'allow_failure_times'];
        filledAttr.forEach(attr => {
            if (data[attr] !== auto[attr]) {
                auto[attr] = data[attr];
            }
        });
        let result = test(data);
        error = result.error;
    }
    catch (err) {
        console.log('testCaseError:', err);
        error = err;
    }
    if (!error) {
        auto.success_times = auto.success_times || 0;
        auto.success_times += 1;
        auto.failure_times = 0;
    }
    else {
        auto.success_times = 0;
        auto.failure_times = auto.failure_times || 0;
        auto.failure_times += 1;
    }
    auto.is_running = false;
    console.log('run task end:', auto.id);
}

// 请求远程服务器，获取最新的测试Case数据详情
function getAutoCase(auto) {
    return new Promise((resolve, reject) => {
        console.log('auto:', auto);
        request({
            method: 'post',
            url: config.caseServer + '/api/case_auto/sync',
            body: JSON.stringify(auto),
            headers: {
                'content-type': 'application/json'
            }
        }, (err, res, body) => {
            if (err) {
                reject(err);
            }
            try {
                if (typeof body === 'string') {
                    body = JSON.parse(body);
                }
                resolve(body);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}