"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task1 = void 0;
var schedule = require('node-schedule');
var task1 = function () {
    var rule = new schedule.RecurrenceRule();
    rule.second = 1;
    schedule.scheduleJob(rule, function () {
        rule.second = 50;
        console.log('执行了定时任务1' + new Date());
    });
};
exports.task1 = task1;
