"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var system_config_1 = require("../configs/system.config");
var task1_1 = require("./tasks/task1");
var scheduleList = function () {
    if (!system_config_1.schedule) {
        return;
    }
    task1_1.task1();
};
module.exports = scheduleList;
