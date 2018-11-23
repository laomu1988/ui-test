/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

async function $clickDialogText(text) {
    await this.$clickClosest('[role="dialog"]', text);
}

module.exports = $clickDialogText;