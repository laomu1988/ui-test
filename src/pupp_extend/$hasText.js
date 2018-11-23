/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 是否存在文字
async function $hasText(text) {
    return !!(await this.evaluate(function (text) {
        return window.$client && window.$client.getSelector(text);
    }, text));
}

module.exports = $hasText;
