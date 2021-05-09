"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const system_config_1 = require("../configs/system.config");
const jwt = require('jsonwebtoken');
const setToken = (obj) => {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        return false;
    }
    try {
        return jwt.sign(obj, system_config_1.tokenSecret, {
            expiresIn: system_config_1.tokenExpiresIn,
        });
    }
    catch (_a) {
        return false;
    }
};
const getToken = (obj) => {
    if (!obj) {
        return false;
    }
    try {
        return jwt.verify(obj, system_config_1.tokenSecret);
    }
    catch (_a) {
        return false;
    }
};
module.exports = {
    setToken,
    getToken,
};
