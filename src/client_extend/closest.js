/**
* @file 查找最近的其他文本节点
* @author muzhilong<muzhilong@baidu.com>
*/

module.exports = function closest(startText, targetText) {
    let dom = null;
    try {
        dom = window.$client.filterHidden(document.querySelectorAll(startText))[0];
    }
    catch (err) {
        // console.error('try querySelector:', startText);
    }
    if (!dom) {
        dom = window.$client.findDomByText(startText);
    }
    if (!dom) {
        return null;
    }

    let bodyText = document.body.innerText.replace(/\s/g, '');
    if (bodyText.indexOf((targetText + '').replace(/\s/g, '')) < 0) {
        while (dom && dom.tagName && dom.tagName !== 'BODY') {
            try {
                let target = dom.querySelector(targetText);
                if (target) {
                    return target;
                }
                dom = dom.parentElement;
            }
            catch (err) {
                console.error('err', err);
                return null;
            }
        }
        return null;
    }
    targetText = (targetText + '').replace(/\s/g, '');

    while (dom && dom.tagName && dom.tagName !== 'BODY') {
        let target = window.$client.findDomByText(targetText, '', dom);
        if (target) {
            return target;
        }
        dom = dom.parentElement;
    }
    return null;
};
