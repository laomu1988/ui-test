/**
* @file 最近元素的选择器
* @author muzhilong<muzhilong@baidu.com>
*/

module.exports = function closestSelector(text, targetText) {
    if (!targetText) {
        return window.$client.getSelector(text);
    }
    let dom = window.$client.closest(text, targetText);
    if (dom) {
        return window.$client.domSelector(dom);
    }
    return null;
};
