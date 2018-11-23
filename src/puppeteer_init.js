/**
 * @file puppeterr测试环境初始化
 * @author muzhilong<muzhilong@baidu.com>
 */
const puppeteer = require('puppeteer');
const extend = require('./puppeteer_extend');


module.exports = async function (params = {headless: true}, logHandle) {
    let browser = await puppeteer.launch({
        headless: params.headless,
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: 1280,
            height: 800
        }
    });
    let page = extend(await browser.newPage(), logHandle);
    return {
        browser,
        page,
        async newPage() {
            return extend(await browser.newPage(), logHandle);
        }
    };
};
