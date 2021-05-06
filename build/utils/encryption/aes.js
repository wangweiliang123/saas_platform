"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const system_1 = require("@/setting/system");
exports.default = {
    //随机生成指定数量的16进制key
    generatekey(num) {
        num = num ? num : 16;
        const library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < num; i++) {
            const randomPoz = Math.floor(Math.random() * library.length);
            key += library.substring(randomPoz, randomPoz + 1);
        }
        return key;
    },
    //加密
    encrypt(word, keyStr) {
        if (!word) {
            return '';
        }
        keyStr = keyStr ? keyStr : system_1.keyCode || 'abcdsxyzhkj84239'; //判断是否存在ksy，不存在就用定义好的key
        const key = crypto_js_1.default.enc.Utf8.parse(keyStr);
        const srcs = crypto_js_1.default.enc.Utf8.parse(word);
        const encrypted = crypto_js_1.default.AES.encrypt(srcs, key, { mode: crypto_js_1.default.mode.ECB, padding: crypto_js_1.default.pad.Pkcs7 });
        return encrypted.toString();
    },
    //解密
    decrypt(word, keyStr) {
        if (!word) {
            return '';
        }
        keyStr = keyStr ? keyStr : system_1.keyCode || 'abcdsxyzhkj84239';
        const key = crypto_js_1.default.enc.Utf8.parse(keyStr);
        const decrypt = crypto_js_1.default.AES.decrypt(word, key, { mode: crypto_js_1.default.mode.ECB, padding: crypto_js_1.default.pad.Pkcs7 });
        return crypto_js_1.default.enc.Utf8.stringify(decrypt).toString();
    },
};
