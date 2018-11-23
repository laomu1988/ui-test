/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

async function $getError() {
    return await this.evaluate(() => {
        let err = window.$client.getErrorText();
        if (err) {
            return JSON.stringify(err);
        }
        return null;
    });
}

module.exports = $getError;
