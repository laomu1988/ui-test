/**
 * @file 服务配置
 * @author laomu1988
 */
const path = require('path');

const config = {
    port: 8001,
    tempDir: path.join(__dirname, '../temp'),
    bodyOptions: {
        json: true
    }
};

module.exports = config;