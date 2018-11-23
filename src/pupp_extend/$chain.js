/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */

const debug = require('debug')('aicp');

// page链式操作，调用结束后执行时需增加end方法
function $chain(test) {
    const page = this;
    const arr = [];
    if (test) {
        return this.$it(test);
    }
    const chain = new Proxy({}, {
        get(target, method) {
            if (method === 'end') {
                return async () => {
                    for (let i = 0; i < arr.length; i++) {
                        let attr = arr[i].method;
                        let args = arr[i].args;
                        debug('$chain.' + attr, args);
                        if (!page[attr]) {
                            throw new Error(`Can NOT find method ${attr} on puppeteer page`);
                        }
                        await page[attr](...args);
                    }
                };
            }
            else if (method === 'then') {
                return;
            }
            return (...args) => {
                arr.push({method, args});
                return chain;
            };
        }
    });
    return chain;
}

module.exports = $chain;