/**
* @file 过滤隐藏元素
* @author muzhilong<muzhilong@baidu.com>
*/

module.exports = function filterHidden(doms) {
    let arr = [];
    if (!doms) {
        return arr;
    }
    doms.forEach(elem => {
        if (!window.$client.isHidden(elem)) {
            arr.push(elem);
        }
    });
    return arr;
};
