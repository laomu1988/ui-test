/**
 * @file 执行测试Case并记录数据
 * @author muzhilong
 */
/* eslint-disable fecs-camelcase */
const fs = require('fs');
const run = require('../testCase');
const db = require('./db');
const time = require('../utils/time');
const mkdir = require('mk-dir');
const config = require('../config');

module.exports = function (cases) {
    let one = {
        time: Date.now(),
        data_id: cases.id,
        name: cases.name,
        username: cases.username,
        project_id: cases.project_id,
        status: 0 // 未执行， 1执行成功，-1执行失败
    };
    db.pushRecord(one);
    return run(cases)
        .then(result => writeResult(one, result))
        .catch(error => writeResult(one, {error: error.message || error, stack: error.stack}));
};

function writeResult(data, result) {
    if (result.error) {
        console.log('Error:', result.error, result.stack);
    }
    let folder = '/record/' + time.date() + '/';
    let path = folder + Date.now() + '_' + Math.random() + '.json';
    data.path = path;
    if (!fs.existsSync(config.dir + folder)) {
        mkdir(config.dir + folder);
    }
    fs.writeFileSync(config.dir + path, JSON.stringify(result), 'utf8');
    data.end = Date.now();
    data.status = result.error ? -1 : 1;
    db.update();
    return result;
}
