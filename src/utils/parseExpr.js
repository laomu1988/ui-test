/**
 * @file 表达式转函数处理
 * @author muzhilong<muzhilong@baidu.com>
 */

function parseExpr(str) {
    if (str === null || typeof str === 'undefined') {
        return true;
    }
    str = (str + '').trim();
    if (!str) {
        return true;
    }
    let strs = [];
    // 替换带引号的字符串
    str = str.replace(/(["']).*?\1/g, function (all) {
        strs.push(all);
        return '$.__str__' + strs.length;
    });
    // 未添加引号的特殊单词增加引号
    str = str.replace(/[^+\-*\/()=]*/g, function (word) {
        word = word.trim();
        if (word === '') {
            return word;
        }
        if (word[0] === '"' || word[0] === '\'' || word.startsWith('$.')) {
            return word;
        }
        if (word.match(/^[\d.]+$/)) {
            return word;
        }
        return '"' + word.replace(/"/g, '\"') + '"';
    });
    // 恢复引号字符串
    str = str.replace(/\$\.__str__(\d+)/g, function (all, index) {
        return strs[parseInt(index, 10) - 1];
    });
    return new Function('$', 'return ' + str + ';');
}

module.exports = parseExpr;
