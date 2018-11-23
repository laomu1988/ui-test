/**
 * @file 等待任意一个文字或选择器出现
 * @author muzhilong<muzhilong@baidu.com>
 */

// 等待文字出现
async function $waitForAny(text1, text2, timeout = 2000) {
    let result = await this.waitForFunction(function (text1, text2) {
        if (!window.$client) {
            return false;
        }
        if (window.$client.getSelector(text1)) {
            return text1;
        }
        if (window.$client.getSelector(text2)) {
            return text2;
        }
        return false;
    }, {timeout}, text1, text2);
    let value = await result.jsonValue();
    await this.waitFor(10);
    console.log('$waitForAny:', value);
    return value;
}

module.exports = $waitForAny;
