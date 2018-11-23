/**
 * @file Puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */
const client = require('./client_extend');
const debug = require('debug')('aicp');
const requireDir = require('require-dir');
const puttExtend = requireDir(__dirname + '/pupp_extend');
const aicpExtend = requireDir(__dirname + '/pupp_aicp_extend');

const noClientMethods = ['$goto', '$it', '$chain', '$debug', '$refresh'];

global.$client = client;


function bindExtends(page, extend) {
    for (let attr in extend) {
        if (noClientMethods.indexOf(attr) >= 0) {
            page[attr] = extend[attr].bind(page);
        }
        else {
            page[attr] = async function (...args) {
                await page.evaluate(client);
                return await extend[attr].apply(page, args);
            };
        }
    }
}

module.exports = function (page, logHandle) {
    bindExtends(page, puttExtend);
    bindExtends(page, aicpExtend);
    page.on('framenavigated', async function (frame) {
        logHandle('[framenavigated]', frame.url());
        await frame.evaluate(client);
        logHandle('[framenavigated-inject]', frame.url());
    });
    page.on('error', function (err) {
        if (typeof logHandle === 'function') {
            logHandle('[Error]', err);
        }
        console.error('page-error', err);
    });
    page.on('pageerror', function (err) {
        if (typeof logHandle === 'function') {
            logHandle('[PageError]', err);
        }
        console.error('Page-Error', err);
    });
    page.on('console', msg => {
        let log = msg.args().map(v => (v + '').replace('JSHandle:', '')).join(' ');
        if (log.match(/error/gi)) {
            debug('[console.error]', log);
            if (typeof logHandle === 'function') {
                logHandle('[console.error]', log);
            }
        }
        else {
            debug('[console]', log);
            if (typeof logHandle === 'function') {
                logHandle('[console]', log);
            }
        }
    });
    return page;
};


