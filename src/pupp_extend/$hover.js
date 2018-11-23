/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 文字所在元素触发hover
async function $hover(text) {
    let selector = await this.evaluate(text => window.$client.getSelector(text), text);
    console.log('selector:', selector, '\n\n');
    if (selector) {
        await this.hover(selector);
    }
    else {
        throw new Error('Can Not Find Dom with Text:', text);
    }
}

module.exports = $hover;