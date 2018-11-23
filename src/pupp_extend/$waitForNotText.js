/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 等待文字消失
async function $waitForNotText(text, timeout = 2000) {
    await this.waitForFunction(function (text) {
        return window.$client && !window.$client.getSelector(text);
    }, {timeout}, text);
}

module.exports = $waitForNotText;
