/**
* @file 取得页面中的错误提示
* @author muzhilong<muzhilong@baidu.com>
*/

module.exports = function getErrorText() {
    let itemError = window.$client.filterHidden(document.querySelectorAll('.el-form-item__error'));
    let alertMessage = window.$client.filterHidden(document.querySelectorAll('.el-message__content'));
    let texts = itemError.concat(alertMessage).map(v => v.innerText);
    if (texts.length > 0) {
        console.log('error', texts);
        return texts;
    }
    return null;
};
