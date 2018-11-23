/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 取得文字所在dom的选择器
async function $getSelector(text) {
    return await this.evaluate(function (text) {
        if (!window.$client) {
            throw new Error('$client函数未注入');
        }
        return window.$client.getSelector(text);
    }, text);
}

module.exports = $getSelector;
