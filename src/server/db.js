/**
 * @file 本地文件数据存储
 * @author muzhilong
 */
/* eslint-disable fecs-camelcase */
const fs = require('fs');
const mkdir = require('mk-dir');
const config = require('../config');
const recordPath = config.tempDir + '/records.json';
const projectPath = config.tempDir + '/project.json';
const casesPath = config.tempDir + '/cases.json';
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
        if (fs.existsSync(casesPath)) {
            this.cases = require(casesPath);
        }
        this.records = this.records || [];
        this.projects = this.projects || [];
        this.cases = this.cases || [];
        this.needUpdate = 0;
    }
    // 增加自动测试Case
    addCase(autoCase) {
        let index = this.cases.find(v => v.id === autoCase.id);
        if (index >= 0) {
            this.cases.splice(index, 1);
        }
        this.cases.unshift(autoCase);
        fs.writeFileSync(casesPath, JSON.stringify(this.cases), 'utf8');
    }
    // 增加自动测试Case
    removeCase(autoCase) {
        let index = this.cases.findIndex(v => v.id === autoCase.id);
        if (index >= 0) {
            this.cases.splice(index, 1);
            fs.writeFileSync(casesPath, JSON.stringify(this.cases), 'utf8');
        }
    }
    // 增加测试记录
    pushRecord(record) {
        this.records.unshift(record);
    }
    filterCase(query) {
        return this.filterData(query, this.cases);
    }
    // 过滤记录数据
    filterRecord(query) {
        return this.filterData(query, this.records);
    }
    filterData(query, all) {
        let page = parseInt(query.page, 10) || 1;
        let pageSize = parseInt(query.pageSize, 10) || 20;
        let project_id = parseInt(query.project_id, 10) || 0;
        let data_id = parseInt(query.data_id, 10) || 0;
        let start = (page - 1) * pageSize;
        if (!project_id) {
            throw new Error('未指定项目');
        }
        if (!all || !Array.isArray(all)) {
            throw new Error('未找到数据');
        }
        all = all.filter(v => v.project_id === project_id);
        if (data_id) {
            all = all.filter(v => v.data_id === data_id);
        }
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
