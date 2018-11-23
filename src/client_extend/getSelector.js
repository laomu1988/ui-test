/**
* @file 取得文字的选择器
* @author muzhilong<muzhilong@baidu.com>
*/


module.exports = function getSelector(text, closestText) {
    // console.log('getSelector:', text);
    let len = arguments.length;
    let dom;
    if (len === 2) {
        dom = window.$client.closest(text, closestText);
    }
    else {
        try {
            dom = window.$client.filterHidden(document.querySelectorAll(text))[0];
        }
        catch (err) {
        }
        if (!dom) {
            dom = window.$client.findDomByText(text);
        }
    }

    if (dom) {
        return window.$client.domSelector(dom);
    }
    return null;
};
