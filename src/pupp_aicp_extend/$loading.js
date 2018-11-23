/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

// 等待加载完毕
async function $loading() {
    await this.waitFor(20);
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
    await this.waitFor(10);
}

module.exports = $loading;
