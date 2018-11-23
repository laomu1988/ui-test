/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// hover行
async function $hoverRow(text) {
    let selector = await this.evaluate(function (text) {
        let selector = window.$client.getSelector(text);
        let dom = document.querySelector(selector);
        while (dom && dom.tagName !== 'BODY') {
            if (dom.tagName === 'TR') {
                return window.$client.domSelector(dom);
            }
            dom = dom.parentElement;
        }
        return null;
    }, text);
    if (!selector) {
        throw new Error('Can Not Find Dom with Text:' + text);
    }
    this.$debug('[hoverRow]', text, selector);
    await this.hover(selector);
}

module.exports = $hoverRow;
