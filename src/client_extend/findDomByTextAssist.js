/**
* @file 根据文字查找节点
* @author muzhilong<muzhilong@baidu.com>
*/


module.exports = function findDomByTextAssist(text, dom) {
    let myText = ((dom.innerText || dom.data) + '').replace(/\s/g, '');
    if (myText.indexOf(text) < 0 || window.$client.isHidden(dom)) {
        return null;
    }
    if (dom.TEXT_NODE > 0 || dom.childElementCount > 0) {
        // 从后向前查找，避免后面覆盖前面时查找到的是前面内容
        let node = dom.lastChild;
        while (node) {
            let d = findDomByTextAssist(text, node);
            if (d) {
                return d.tagName ? d : node;
            }
            node = node.previousSibling;
        }
    }
    if (text === myText) {
        return dom;
    }
    return null;
};
