/**
 * @file 时间函数
 * @author laomu1988
 */

function date(date) {
    date = date || new Date();
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }
    return date.getFullYear() + (date.getMonth() + 1 + '').padStart(2, '0') + (date.getDate() + '').padStart(2, '0');
}

function datetime(date) {
    date = date || new Date();
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }
    return date.getFullYear()
        + '-'
        + (date.getMonth() + 1 + '').padStart(2, '0')
        + '-'
        + (date.getDate() + '').padStart(2, '0')
        + ' '
        + (date.getHours() + '').padStart(2, '0')
        + ':'
        + (date.getMinutes() + '').padStart(2, '0')
        + ':'
        + (date.getSeconds() + '').padStart(2, '0');
}

module.exports = {
    date: date,
    datetime: datetime
};
