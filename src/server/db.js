/**
 * @file 本地文件数据存储
 * @author muzhilong
 */
const fs = require('fs');
const mkdir = require('mk-dir');
const config = require('../config');
const recordPath = config.tempDir + '/records.json';
const projectPath = config.tempDir + '/project.json';
class Db {
    constructor() {
        if (!fs.existsSync(config.tempDir)) {
            mkdir(config.tempDir);
        }
        if (fs.existsSync(recordPath)) {
            this.records = require(recordPath);
        }
        if (fs.existsSync(projectPath)) {
            this.records = require(projectPath);
        }
        this.records = this.records || [];
        this.projects = this.projects || [];
        this.needUpdate = 0;
    }
    // 更新项目数据
    updateProject(project) {
    }
    // 增加测试记录
    pushRecord(record) {
        this.records.push(record);
    }
    // 过滤记录数据
    filterRecord(query) {
        let page = parseInt(query.page, 10) || 1;
        let pageSize = parseInt(query.pageSize, 10) || 20;
        let start = (page - 1) * pageSize;
        let all = this.records;
        let list = all.slice(start, start + pageSize);
        return {
            total: all.length,
            page,
            pageSize,
            list
        };
    }
    // 更新json数据
    update() {
        this.needUpdate + 1;
        this.forceUpdate();
    }
    forceUpdate() {
        fs.writeFileSync(recordPath, JSON.stringify(this.records), 'utf8');
        this.needUpdate = 0;
    }
}
const db = new Db();

module.exports = db;
