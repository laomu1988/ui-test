/**
* @file 根据label查找输入框
* @author muzhilong<muzhilong@baidu.com>
*/



/**
 * 根据label查找输入框
 *
 * @param {string} label label中文字
 * @return {DOM} 查找到的输入框, 未找到输入框时返回null
 */
module.exports = function labelInput(label) {
    // console.log('labelInput:', label);
    let dom = window.$client.findDomByText(label);
    if (dom && dom.querySelector) {
        let p = dom;
        let input = window.$client.filterHidden(p.querySelectorAll('input,textarea'))[0];
        if (!input && p.parentNode) {
            p = p.parentNode;
            input = window.$client.filterHidden(p.querySelectorAll('input,textarea'))[0];
        }
        if (!input && p.parentNode) {
            p = p.parentNode;
            input = window.$client.filterHidden(p.querySelectorAll('input,textarea'))[0];
        }
        if (!input) {
            return null;
        }
        return input;
    }
    return null;
};