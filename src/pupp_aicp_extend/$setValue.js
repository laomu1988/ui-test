/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

const debug = require('debug')('aicp');

// 设置输入框值
async function $setValue(label, value) {
    value = value || '';
    let input = await this.evaluate(function (label) {
        let selector = window.$client.getSelector(label);
        let dom = selector ? window.document.querySelector(selector) : null;
        if (!dom) {
            return null;
        }
        let parent = dom.parentElement;
        let select = parent.querySelector('.el-select');
        if (select) {
            return {
                type: 'select',
                selector: window.$client.domSelector(select)
            };
        }
        let input = parent.querySelector('.el-input__inner');
        if (input) {
            return {
                type: 'input',
                selector: window.$client.domSelector(input)
            };
        }
        let textarea = parent.querySelector('.el-textarea__inner');
        if (textarea) {
            return {
                type: 'input',
                selector: window.$client.domSelector(textarea)
            };
        }
        selector = window.$client.labelInputSelector(label);
        if (selector) {
            return {type: 'input', selector};
        }
        return null;
    }, label);
    if (!input) {
        throw new Error('Can Not Find Dom with Text:' + label);
    }

    debug('[selector]', label, input.type, input.selector);
    if (input.type === 'input') {
        await this.$clearValue(input.selector, value);
        await this.type(input.selector, value);
    }
    else {
        await this.$click(input.selector);
        await this.waitFor(30);
        await this.$waitForText(value);
        await this.$click(value);
    }
}

module.exports = $setValue;
