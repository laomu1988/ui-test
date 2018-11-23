/**
 * @file 刷新页面
 * @author muzhilong<muzhilong@baidu.com>
 */

// 跳转页面并注入客户端函数
async function $refresh() {
    await this.evaluate(() => {
        history.go(0);
    });
    await this.waitFor(10);
    await this.waitForNavigation();
}

module.exports = $refresh;