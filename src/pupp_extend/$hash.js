/**
 * @file 修改页面的hash值
 * @author muzhilong<muzhilong@baidu.com>
 */

async function $hash(hash) {
    if (hash[0] !== '#') {
        hash = '#' + hash;
    }
    await this.evaluate(hash => {
        location.hash = hash;
    }, hash);
}

// 修改页面hash值
module.exports = $hash;
