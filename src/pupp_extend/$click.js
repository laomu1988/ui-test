/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

async function $click(text, timeout = 10000) {
    await this.waitForFunction(text => window.$client && !!window.$client.getSelector(text), {timeout}, text);

    let result = await this.evaluate(text => {
        let selector = window.$client.getSelector(text);
        if (!selector) {
            return -1;
        }
        console.log('domSelector: ' + selector);
        let dom = window.document.querySelector(selector);
        if (dom && dom.click) {
            dom.click();
        }
        else if (dom && dom.parentElement && dom.parentElement.click) {
            dom.parentElement.click();
        }
    }, text);
    if (result === -1) {
        throw new Error('Can Not Find Dom with Text:', text);
    }
    await this.waitFor(10);
    // await this.click(selector);
}

module.exports = $click;
