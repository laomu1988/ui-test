/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

async function $notError() {
    await this.waitFor(30);
    await this.evaluate(() => {
        let err = window.$client.getErrorText();
        if (err) {
            throw new Error('Client has Error:' + JSON.stringify(err));
        }
    });
}


module.exports = $notError;
