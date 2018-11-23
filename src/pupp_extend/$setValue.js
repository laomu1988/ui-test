/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

 // 设置输入框值
async function $setValue(inputSelector, value) {
    value = value || '';
    let selector = await this.$getInputSelector(inputSelector);
    if (!selector) {
        throw new Error('Can Not Find Dom with Text:', inputSelector);
    }
    await this.type(selector, value);
}

module.exports = $setValue;
