#!/usr/bin/env node

/**
 * @file 命令行工具
 * @author laomu1988
 */
const pkg = require('../package.json');
const program = require('commander');
const config = {};

program
    .version(pkg.version, '-v, --version')
    .command('ui-test -h server-host -p 8001', '启动本地服务并指定端口和远程服务地址')
    .option('-h, --host <host>', 'ui-test远程测试Case管理服务地址')
    .option('-p, --port <n>', 'ui-test本地服务端口，默认为8001', parseInt)
    .option('-d, --dir <host>', 'ui-test本地数据保存目录')
    .parse(process.argv);

if (program.host) {
    config.caseServer = program.host;
}

if (program.port) {
    config.port = program.port;
}

if (program.dir) {
    config.tempDir = program.dir;
}
console.log('config:', config);

global.config = config;

require('../src/server');