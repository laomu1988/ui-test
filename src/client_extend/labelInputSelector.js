/**
* @file 根据label查找输入框
* @author muzhilong<muzhilong@baidu.com>
*/

/**
 * 根据label查找输入框
 *
 * @param {string} label label中文字
 * @return {string} 查找到的输入框的选择器, 未找到输入框时返回null
 */
module.exports = function labelInputSelector(label) {
    let dom = window.$client.labelInput(label);
    if (dom) {
        return window.$client.domSelector(dom);
    }
    return null;
};