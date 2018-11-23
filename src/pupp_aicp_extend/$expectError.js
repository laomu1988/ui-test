/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 预计将出现错误提示
async function $expectError(text) {
    await this.waitForFunction(() => {
        let doms = document.querySelector('.el-loading-mask');
        if (!doms) {
            return true;
        }
        for (let i = 0; i < doms.length; i++) {
            if (doms[i].style.display !== 'none') {
                console.log('is-loading');
                return false;
            }
        }
        return true;
    });
    await this.evaluate(text => {
        let err = window.$client.getErrorText();
        if (err) {
            if (text) {
                return err.find(text);
            }
            return true;
        }
        return false;
    }, text);
}

module.exports = $expectError;
