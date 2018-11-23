/**
 * @file 判断元素是否被隐藏
 * @author muzhilong<muzhilong@baidu.com>
 */

module.exports = function isHidden(elem) {
    if (!elem.getClientRects) {
        return false;
    }
    if (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length) {
        return false;
    }
    return true;
};
