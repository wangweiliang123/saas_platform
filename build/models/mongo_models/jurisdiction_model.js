"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jurisdiction = void 0;
var mongoose = require('./db');
var jurisdictionSet = function () {
    var schema = new mongoose.Schema({
        id: { type: String, require: true, index: true, unique: true },
        info: { type: String, require: true },
    });
    return mongoose.model('jurisdiction', schema);
};
exports.Jurisdiction = jurisdictionSet();
