/**
 * @file 服务配置
 * @author laomu1988
 */
const path = require('path');
const os = require('os');

const config = {
    port: 8001, // 本地测试服务端口
    caseServer: 'http://localhost:8201', // case管理服务地址
    interval: 30, // 30秒
    tempDir: os.homedir() + '/.e2etest',
    maxInstance: 3, // 最多同时启用的进程数目
    chromium: '', // 指定chromium路径地址
    bodyOptions: {
        json: true
    }
};

const globalConfig = global.config;

module.exports = Object.assign(config, globalConfig);