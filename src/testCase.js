/**
 * @file 使用object对象数据格式进行测试，不再使用测试框架
 * @author muzhilong<muzhilong@baidu.com>
 */

/* eslint-disable fecs-camelcase */
const fs = require('fs');
const mkdir = require('mk-dir');
const _ = require('lodash');
const config = require('./config');
const init  = require('./puppeteer_init');
const parseExpr = require('./utils/parseExpr');
const time = require('./utils/time');
let page = null;


async function runCase(one, config, handleLog) {
    if (one instanceof Array) {
        for (let i = 0; i < one.length; i++) {
            await runCase(one[i], config, handleLog);
        }
        return;
    }
    one.run_status = 1;
    one.run_start = Date.now();
    if (one.id) {
        handleLog('RunCase:', one.id, one.name || '', one.type, one.method, one.args);
    }
    if (one.config) {
        config = Object.assign(config || {}, one.config);
    }
    one.config = config;
    if (one.condition) {
        if (!evalExpr(one.condition, config)) {
            one.run_status = 3;
            handleLog(' 不满足条件，无需执行');
            return;
        }
    }
    let result;
    let hasRunChildren = false;
    if (one.method) {
        let args = (one.args || []).map(v => evalExpr(v, config));
        one.log = one.method + '(' + args.map(stringify).join(',') + ')';
        handleLog(' method', one.log);
        if (one.method === 'exec') {
            result = args[0];
        }
        else if (one.method === 'repeat') {
            let len = args[0];
            let repeatIndex = args[1] || '$index_' + one.id;
            config[repeatIndex] = 0;
            for (;config[repeatIndex] < len; config[repeatIndex]++) {
                await runCase(one.children || [], config, handleLog);
            }
            hasRunChildren = true;
        }
        else if (page[one.method]) {
            result = await page[one.method](...args);
        }
        else {
            handleLog(' 未知方法', one.method);
            console.error('未知方法', one.method);
            throw new Error('Unknow Function:' + one.method);
        }
        if (one.variable) {
            config[one.variable] = result;
            handleLog('variable:', one.variable, result);
        }
    }
    if (!hasRunChildren) {
        await runCase(one.children || [], config, handleLog);
    }
    one.run_time = Date.now() - one.run_start;
    one.run_status = 2;
    return result;
}


async function test(data) {
    const output = [];
    let prev_output = null;
    let imageFolder = '/image/' + time.date();
    let image = imageFolder + '/' + (Date.now() + '' + Math.random()).replace('.', '_') + '.png';
    if (!fs.existsSync(config.dir + imageFolder)) {
        mkdir(config.dir + imageFolder);
    }
    let pupp_config = {headless: true};
    if (config.chromium) {
        let path = config.chromium;
        if (path.endsWith('.app')) {
            path = path + '/Contents/MacOS/Chromium';
        }
        pupp_config.executablePath = path;
    }
    if (config.chromiumLanch) {
        pupp_config = Object.assign(pupp_config, config.chromiumLanch);
    }
    let pupp = await init(pupp_config, handleLog);
    let result = null;
    let error = null;
    data = _.cloneDeep(data);
    data.old = _.cloneDeep(data.config);
    page = pupp.page;
    try {
        result = await runCase(data, null, handleLog);
        await page.screenshot({path: config.dir + '/' + image});
    }
    catch (err) {
        console.log('error', err);
        await page.screenshot({path: config.dir + '/' + image});
        error = err.stack;
    }
    await pupp.browser.close();
    return {
        data,
        result,
        output,
        image,
        errno: error ? 400 : 0,
        error
    };

    function handleLog(...logs) {
        let str = logs.join(' ');
        if (prev_output && str === prev_output[1]) {
            prev_output[2] = prev_output[2] ? prev_output[2] + 1 : 2;
        }
        else {
            prev_output = [Date.now(), logs.join(' ')];
            output.push(prev_output);
        }
    }
}

module.exports = test;

// 执行表达式, 执行前需将不带引号的字符串转为带引号，避免函数执行失败
function evalExpr(str, data) {
    let func = parseExpr(str);
    if (typeof func === 'function') {
        return func(data);
    }
    return func;
}


function stringify(obj) {
    if (typeof obj === 'function') {
        return (obj + '').replace(/\w*/, 'function').replace(/\n\s*/g, '');
    }
    if (!obj || typeof obj !== 'object') {
        return JSON.stringify(obj);
    }
    if (obj instanceof Array) {
        return '[' + obj.map(stringify).join(', ') + ']';
    }
    return '{' + Object.keys(obj)
        .map(attr =>
            attr + ':' + stringify(obj[attr])
        ).join(', ') + '}';
}
