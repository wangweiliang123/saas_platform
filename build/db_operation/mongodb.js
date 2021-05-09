"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 引入MongoDB数据库模块
var MongoDB = require('mongodb');
// 获得数据库客户端
var MongoClient = MongoDB.MongoClient;
// 获取操作数据库ID的方法
var ObjectID = MongoDB.ObjectID;
// 引入数据库的配置文件
var Config = require('../configs/mongodb.config');
var DB = /** @class */ (function () {
    function DB() {
        this.dbClient = '';
        // 实例化的时候就连接数据库，解决第一次查询太久的问题
        this.connect();
    }
    // 单例模式，解决多次实例化实例不共享的问题
    DB.getInstance = function () {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    };
    // 连接数据库
    DB.prototype.connect = function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            //  解决数据库多次连接的问题
            if (!that.dbClient) {
                MongoClient.connect(Config.dbUrl, { useNewUrlParser: true }, function (err, client) {
                    if (err) {
                        return reject({
                            dataStatus: 0,
                            errInfo: err,
                            errMessage: '数据库连接失败',
                            successMessage: '',
                            result: {},
                        });
                    }
                    else {
                        that.dbClient = client.db(Config.dbName);
                        resolve(that.dbClient);
                    }
                });
            }
            else {
                resolve(that.dbClient);
            }
        });
    };
    // 查找方法
    DB.prototype.find = function (collectionName, json) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (db) {
                var result = db.collection(collectionName).find(json);
                result.toArray(function (err, doc) {
                    if (err) {
                        return reject({
                            dataStatus: 0,
                            errInfo: err,
                            errMessage: '执行数据库操作失败',
                            successMessage: '',
                            result: {},
                        });
                    }
                    else {
                        resolve({
                            dataStatus: 1,
                            result: doc,
                            errMessage: '',
                            errInfo: '',
                            successMessage: '执行数据库操作成功',
                        });
                    }
                });
            });
        });
    };
    // 更新方法
    DB.prototype.update = function (collectionName, oldJson, newJson) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (db) {
                db.collection(collectionName).updateOne(oldJson, {
                    $set: newJson,
                }, function (err, res) {
                    if (err) {
                        return reject({
                            dataStatus: 0,
                            errInfo: err,
                            errMessage: '执行数据库操作失败',
                            successMessage: '',
                            result: {},
                        });
                    }
                    else {
                        resolve({
                            dataStatus: 1,
                            result: res,
                            errMessage: '',
                            errInfo: '',
                            successMessage: '执行数据库操作成功',
                        });
                    }
                });
            });
        });
    };
    // 插入数据
    DB.prototype.insert = function (collectionName, json) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (db) {
                db.collection(collectionName).insertOne(json, function (err, res) {
                    if (err) {
                        return reject({
                            dataStatus: 0,
                            errInfo: err,
                            errMessage: '执行数据库操作失败',
                            successMessage: '',
                            result: {},
                        });
                    }
                    else {
                        resolve({
                            dataStatus: 1,
                            result: res,
                            errMessage: '',
                            errInfo: '',
                            successMessage: '执行数据库操作成功',
                        });
                    }
                });
            });
        });
    };
    // 删除数据
    DB.prototype.remove = function (collectionName, json) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connect().then(function (db) {
                db.collection(collectionName).removeOne(json, function (err, res) {
                    if (err) {
                        return reject({
                            dataStatus: 0,
                            errInfo: err,
                            errMessage: '执行数据库操作失败',
                            successMessage: '',
                            result: {},
                        });
                    }
                    else {
                        resolve({
                            dataStatus: 1,
                            result: res,
                            errMessage: '',
                            errInfo: '',
                            successMessage: '执行数据库操作成功',
                        });
                    }
                });
            });
        });
    };
    // mongodb里面查询_id需要把字符串转换成对象
    DB.prototype.getObjectId = function (id) {
        return new ObjectID(id);
    };
    return DB;
}());
module.exports = DB.getInstance();
