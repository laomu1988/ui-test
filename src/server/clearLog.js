/**
 * @file 清理日志
 * @author laomu1988
 */
const fs = require('fs-extra');
const config = require('../config');
const path = require('path');
const time = require('../utils/time');
const db = require('./db');


function clear() {
    let endTime = Date.now() - ((config.retain || 30) * 24 * 60 * 60 * 1000);
    let endDay = time.date(new Date(endTime));
    // 删除日志引用
    let oldLen = db.records.length;
    db.records = db.records.filter(v => v.time > endTime);
    if (db.records.length < oldLen) {
        db.update();
    }

    // 删除独立的数据日志
    let recordPath = path.join(config.dir, 'record');
    if (fs.existsSync(recordPath)) {
        let dirs = fs.readdirSync(recordPath);
        dirs.forEach(day => {
            if (parseInt(day, 10) && day < endDay) {
                let dir = path.join(recordPath, day);
                console.log('RemoveLog:', dir);
                fs.removeSync(dir);
            }
        });
    }

    // 删除日志图片文件
    recordPath = path.join(config.dir, 'image');
    if (fs.existsSync(recordPath)) {
        let dirs = fs.readdirSync(recordPath);
        dirs.forEach(day => {
            if (parseInt(day, 10) && day < endDay) {
                let dir = path.join(recordPath, day);
                console.log('RemoveLog:', dir);
                fs.removeSync(dir);
            }
        });
    }
}

module.exports = function () {
    try {
        clear();
    }
    catch (err) {
        console.error('ClearLogError:', err);
    }
};