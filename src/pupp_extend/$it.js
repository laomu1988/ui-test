/**
 * @file puppeteer扩展函数
 * @author muzhilong<muzhilong@baidu.com>
 */
const debug = require('debug')('aicp');
let hasError = false;
/* global jest */
global.hasError = false;

// 链式操作并输出测试示例
function $it(test) {
    const page = this;
    const chain = new Proxy({}, {
        get(target, method) {
            if (method === 'end') {
                return () => {};
            }
            if (method === 'then') {
                return;
            }
            return (...args) => {
                let argsString = args.map(arg => {
                    if (typeof arg === 'string') {
                        return arg;
                    }
                    else {
                        try {
                            return JSON.stringify(arg);
                        }
                        catch (err) {
                            return JSON.stringify(err);
                        }
                    }
                }).join(',');
                test(method + ': ' + argsString, async () => {
                    if (hasError) {
                        // global.jest.clearAllTimers();
                        throw new Error('prev method has not success...');
                    }
                    try {
                        if (!page[method]) {
                            throw new Error(`Can NOT find method ${method} on puppeteer page`);
                        }
                        return await page[method](...args);
                    }
                    catch (err) {
                        hasError = true;
                        test.hasError = true;
                        global.hasError = true;
                        throw err;
                    }
                });
                return chain;
            };
        }
    });
    return chain;
}

module.exports = $it;
