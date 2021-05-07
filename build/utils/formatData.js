"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstToUpper = exports.dataCleaning = void 0;
/**
 * 数据清洗
 * @param value，需要清洗的数据
 * @param format，格式化参数
 */
const dataCleaning = (value, format) => {
    if (!value) {
        return '';
    }
    if (!format || !format.length) {
        return '';
    }
    if (Object.prototype.toString.call(format) !== '[object Array]') {
        return '';
    }
    if (Object.prototype.toString.call(value) === '[object Array]') {
        if (value.length > 0) {
            let result = [];
            result = value.map((item) => {
                const obj = {};
                for (const itm in item) {
                    for (let i = 0; i < format.length; i++) {
                        if (format[i].key === itm) {
                            let nameValue = itm;
                            const nameValueList = nameValue.split('_');
                            const nameValueSet = nameValueList.map((val, index) => {
                                if (index) {
                                    return exports.firstToUpper(val);
                                }
                                return val;
                            });
                            nameValue = nameValueSet.join('');
                            if (format[i].showKey) {
                                nameValue = format[i].showKey;
                            }
                            obj[nameValue] = item[itm];
                            break;
                        }
                    }
                }
                return obj;
            });
            return result;
        }
        else {
            return [];
        }
    }
    else if (Object.prototype.toString.call(value) === '[object Object]') {
        const result = {};
        for (const item in value) {
            for (let i = 0; i < format.length; i++) {
                if (format[i].key === item) {
                    let nameValue = item;
                    const nameValueList = nameValue.split('_');
                    const nameValueSet = nameValueList.map((val, index) => {
                        if (index) {
                            return exports.firstToUpper(val);
                        }
                        return val;
                    });
                    nameValue = nameValueSet.join('');
                    if (format[i].showKey) {
                        nameValue = format[i].showKey;
                    }
                    result[nameValue] = value[item];
                    break;
                }
            }
        }
        return result;
    }
    return value;
};
exports.dataCleaning = dataCleaning;
/**
 * 首字母大写
 * @param str,字符串
 */
const firstToUpper = (str) => {
    return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
    });
};
exports.firstToUpper = firstToUpper;
