"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_sha256_1 = require("js-sha256");
exports.default = {
    //加密
    encrypt(message) {
        if (!message) {
            return '';
        }
        return js_sha256_1.sha256(message);
    },
};
