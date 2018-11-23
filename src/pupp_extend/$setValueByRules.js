/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */


// 根据对象的rules设置值，rules格式{name: {label: '名称'}, desc: {label: '描述'}}
async function $setValueByRules(data, rules) {
    for (let attr in data) {
        let rule = rules[attr];
        if (rule && rule.label) {
            await this.$setValue(rule.label, data[attr]);
        }
    }
}

module.exports = $setValueByRules;