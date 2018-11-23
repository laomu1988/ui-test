/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 移动鼠标指定位置
async function $moveTo(text, closest) {
    let ps = await this.evaluate((text, closest) => {
        let selector = window.$client.closestSelector(text, closest);
        if (selector) {
            let dom = document.querySelector(selector);
            let ps = dom.getBoundingClientRect();
            console.log('ps:', JSON.stringify(ps));
            return JSON.stringify(ps);
        }
        return null;
    }, text, closest);
    if (ps) {
        ps = JSON.parse(ps);
        await this.mouse.move(ps.x + 4, ps.y + 4, {steps: 3});
        await this.waitFor(20);
    }
    else {
        throw new Error('Can Not Find Dom with Text:' + text + ',' + closest);
    }
}

module.exports = $moveTo;
