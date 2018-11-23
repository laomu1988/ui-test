/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

const debug = require('debug')('aicp');

function $debug(...args) {
    debug(...args);
}

module.exports = $debug;