/**
 * @file 时间函数
 * @author laomu1988
 */

function date(date) {
    date = date || new Date();
    return date.getFullYear() + (date.getMonth() + 1 + '').padStart(2, '0') + (date.getDate() + '').padStart(2, '0');
}


module.exports = {
    date: date
};
