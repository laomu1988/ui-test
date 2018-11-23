/**
* @file 根据文本查找元素并点击
* @author muzhilong<muzhilong@baidu.com>
*/


module.exports = function clickText(text, selector) {
    let dom = window.$client.findDomByText(text, selector);
    if (dom) {
        dom.click();
        return dom;
    }
    return false;
};
