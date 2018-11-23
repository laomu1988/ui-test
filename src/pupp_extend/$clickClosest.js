/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */
const debug = require('debug')('aicp');

// 点击文字附近符合选择器的元素
async function $clickClosest(text, closest) {
    let selector = await this.evaluate(
        (text, closest) => window.$client.closestSelector(text, closest),
        text, closest);
    debug('[$clickClosest]', text, closest, selector);
    if (selector) {
        await this.$click(selector);
    }
    else {
        throw new Error('Can Not Find Dom with Text:' + text + ',' + closest);
    }
}

module.exports = $clickClosest;