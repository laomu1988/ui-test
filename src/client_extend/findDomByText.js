/**
* @file 根据text查找dom元素
* @author muzhilong<muzhilong@baidu.com>
*/


/**
 * 根据文本内容查找dom
 *
 * @param {string} text 要查找的文本
 * @param {string} [selector] 文本所在的选择器
 * @param {string|DOM} [superSelector] 容器的选择器，默认body
 * @return {DOM} 查找到的dom节点，未找到时返回null
 */
module.exports = function findDomByText(text, selector, superSelector = 'body') {
    if (!text || typeof text !== 'string') {
        throw new Error('findDomByText(text) need text as string');
    }
    // console.log('findDomByText', text, selector);
    text = (text + '').replace(/\s/g, '');
    let root = superSelector.querySelector ? superSelector : document.querySelector(superSelector);
    if (selector) {
        let doms = window.$client.filterHidden(root.querySelectorAll(selector));
        let len = doms.length;
        for (let i = len - 1; i >= 0; i--) { // 从后向前查找，避免后面覆盖前面时查找到的是前面内容
            let dom = doms[i];
            let inner = dom.innerText;
            if (inner && inner.replace(/\s/g, '') === text) {
                return dom;
            }
            // input元素的当前输入值
            let value = dom.getAttribute('value') || dom.value;
            if (value && value.replace(/\s/g, '') === text) {
                return dom;
            }

            value = dom.getAttribute('placeholder');
            if (value && value.replace(/\s/g, '') === text) {
                return dom;
            }
        }
        return null;
    }
    // input元素的当前输入值
    let values = window.$client.filterHidden(document.querySelectorAll('input'));
    for (let i = 0; i < values.length; i++) {
        let dom = values[i];
        if (dom.style.display === 'none') {
            continue;
        }
        let value = dom.getAttribute('value') || dom.value;
        if (value && value.replace(/\s/g, '') === text) {
            return dom;
        }
    }

    // 查询input元素的placeholder
    values = window.$client.filterHidden(document.querySelectorAll('[placeholder]'));
    for (let i = 0; i < values.length; i++) {
        let dom = values[i];
        let value = dom.getAttribute('placeholder');
        if (value && value.replace(/\s/g, '') === text) {
            return dom;
        }
    }
    return window.$client.findDomByTextAssist(text, root);
};
