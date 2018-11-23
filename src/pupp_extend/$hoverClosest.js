/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 文字所在元素触发hover
async function $hoverClosest(text, closest) {
    let selector = await this.evaluate(
        (text, closest) => window.$client.closestSelector(text, closest),
        text, closest);
    console.log('selector:', selector, '\n\n');
    if (selector) {
        await this.hover(selector);
    }
    else {
        throw new Error('Can Not Find Dom with Text:', text, closest);
    }
}

module.exports = $hoverClosest;