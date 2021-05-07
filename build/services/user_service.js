"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatData_1 = require("../utils/formatData");
const UserServiceSql = require('../db_sqls/mysql_sql/user_sql');
module.exports = {
    getUserAll: (ctx, format) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            ctx.util
                .mysql(UserServiceSql.getUserAll())
                .then((res) => {
                if (format) {
                    if (Object.prototype.toString.call(format) === '[object Array]') {
                        res.result = formatData_1.dataCleaning(res.result, format);
                    }
                }
                resolve(res);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }),
};
