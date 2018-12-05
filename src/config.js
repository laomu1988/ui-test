/**
 * @file 服务配置
 * @author laomu1988
 */
const os = require('os');

const config = Object.assign({
    port: 8001, // 本地测试服务端口
    host: 'http://localhost:8201', // case管理服务地址
    chromium: '', // 指定chromium路径地址
    chromiumLanch: null, // 加载chromium lunch时参数
    dir: os.homedir() + '/.e2etest',
    interval: 30, // 30秒
    maxInstance: 3, // 最多同时启用的进程数目
    retain: 30, // 日志最多保存多少天,默认30天
    bodyOptions: {
        json: true
    }
}, global.config);

console.log('UseConfig', JSON.stringify(config, null, 4));

module.exports = config;