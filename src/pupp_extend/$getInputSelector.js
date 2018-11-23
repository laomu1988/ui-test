/**
 * @file 清空输入框的数据
 * @author muzhilong<muzhilong@baidu.com>
 */

// 根据文字取得输入框选择器
async function $getInputSelector(text, timeout) {
    await this.waitForFunction(text => window.$client && !!window.$client.getSelector(text), {timeout}, text);

    return await this.evaluate(function (text) {
        return window.$client.labelInputSelector(text);
    }, text);
}

// 修改页面hash值
module.exports = $getInputSelector;
