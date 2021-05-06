"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = exports.getValueText = exports.randomNum = void 0;
/**
 * 生成从minNum到maxNum的随机数
 * @param Number {minNum} {maxNum} 区间
 */
const randomNum = (minNum, maxNum) => {
    if (minNum || minNum === 0) {
        if (maxNum || maxNum === 0) {
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        }
        else {
            return parseInt(Math.random() * minNum + 1, 10);
        }
    }
    return 0;
};
exports.randomNum = randomNum;
/**
 * 获取value值的text说明
 * @param valueList,value数组,例：[{value:1,text:"项目1"}]
 * @param  value,匹配值
 */
const getValueText = (valueList, value) => {
    let result = '';
    if (valueList && valueList.length && String(value)) {
        for (let i = 0; i < valueList.length; i++) {
            if (String(valueList[i].value) === String(value)) {
                result = valueList[i].text;
                break;
            }
        }
    }
    return result;
};
exports.getValueText = getValueText;
/**
 * 深度克隆对象
 * @param obj，要克隆的对象
 */
const deepClone = (obj) => {
    const isArr = Array.isArray(obj);
    const isJson = Object.prototype.toString.call(obj) === '[object Object]';
    if (isArr) {
        // 克隆数组
        const newObj = [];
        for (let i = 0; i < obj.length; i++) {
            newObj[i] = exports.deepClone(obj[i]);
        }
        return newObj;
    }
    else if (isJson) {
        // 克隆Object
        const newObj = {};
        for (const i in obj) {
            newObj[i] = exports.deepClone(obj[i]);
        }
        return newObj;
    }
    // 不是引用类型直接返回
    return obj;
};
exports.deepClone = deepClone;
