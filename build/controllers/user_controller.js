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
const UserService = require('../services/user_service');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { User } = require('../models/user_model');
module.exports = {
    add: (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield UserService.getUserAll(ctx, next)
            .then((res) => {
            ctx.body = res;
        })
            .catch((err) => {
            ctx.body = err;
        });
    }),
};
