/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 等待文字出现
async function $waitForText(text, timeout = 2000) {
    await this.waitForFunction(function (text) {
        return window.$client && !!window.$client.getSelector(text);
    }, {timeout}, text);
    await this.waitFor(10);
}

module.exports = $waitForText;
