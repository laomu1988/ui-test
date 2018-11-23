/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

async function $catchError(err) {
    if (!err) {
        return;
    }
    let pageError = await this.$getError();
    if (pageError) {
        throw new Error('PageError:' + pageError + ',' + JSON.stringify(err));
    }
    throw err;
}

module.exports = $catchError;
