/**
 * @file 清空输入框的数据
 * @author muzhilong<muzhilong@baidu.com>
 */

async function $clearValue(label) {
    await this.evaluate(label => {
        let dom = document.querySelector(label);
        if (!dom) {
            dom = window.$client.labelInput(label);
        }
        if (dom && dom.tagName) {
            dom.value = '';
            let event = document.createEvent('UIEvents');
            event.initEvent('input', true, true);
            event.eventType = 'message';
            dom.dispatchEvent(event);
        }
        else {
            throw new Error('Can Not Find Input With Label:' + label);
        }
    }, label);
}

// 修改页面hash值
module.exports = $clearValue;
