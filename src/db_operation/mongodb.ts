export {}
// 引入MongoDB数据库模块
const MongoDB = require('mongodb')
// 获得数据库客户端
const MongoClient = MongoDB.MongoClient
// 获取操作数据库ID的方法
const ObjectID = MongoDB.ObjectID
// 引入数据库的配置文件
const Config = require('../configs/mongodb.config')

class DB {
  static instance: any
  dbClient: string
  // 单例模式，解决多次实例化实例不共享的问题
  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB()
    }
    return DB.instance
  }
  constructor() {
    this.dbClient = ''
    // 实例化的时候就连接数据库，解决第一次查询太久的问题
    this.connect()
  }
  // 连接数据库
  connect() {
    const that = this
    return new Promise((resolve, reject) => {
      //  解决数据库多次连接的问题
      if (!that.dbClient) {
        MongoClient.connect(Config.dbUrl, { useNewUrlParser: true }, (err: any, client: any) => {
          if (err) {
            reject({
              dataStatus: 0,
              errInfo: err,
              errMessage: '数据库连接失败',
              successMessage: '',
              result: {},
            })
          } else {
            that.dbClient = client.db(Config.dbName)
            resolve(that.dbClient)
          }
        })
      } else {
        resolve(that.dbClient)
      }
    })
  }
  // 查找方法
  find(collectionName: any, json: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        const result = db.collection(collectionName).find(json)
        result.toArray(function (err: any, doc: any) {
          if (err) {
            return reject({
              dataStatus: 0,
              errInfo: err,
              errMessage: '执行数据库操作失败',
              successMessage: '',
              result: {},
            })
          } else {
            resolve({
              dataStatus: 1,
              result: doc,
              errMessage: '',
              errInfo: '',
              successMessage: '执行数据库操作成功',
            })
          }
        })
      })
    })
  }
  // 更新方法
  update(collectionName: any, oldJson: any, newJson: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(collectionName).updateOne(
          oldJson,
          {
            $set: newJson,
          },
          (err: any, res: any) => {
            if (err) {
              return reject({
                dataStatus: 0,
                errInfo: err,
                errMessage: '执行数据库操作失败',
                successMessage: '',
                result: {},
              })
            } else {
              resolve({
                dataStatus: 1,
                result: res,
                errMessage: '',
                errInfo: '',
                successMessage: '执行数据库操作成功',
              })
            }
          },
        )
      })
    })
  }
  // 插入数据
  insert(collectionName: any, json: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(collectionName).insertOne(json, function (err: any, res: any) {
          if (err) {
            return reject({
              dataStatus: 0,
              errInfo: err,
              errMessage: '执行数据库操作失败',
              successMessage: '',
              result: {},
            })
          } else {
            resolve({
              dataStatus: 1,
              result: res,
              errMessage: '',
              errInfo: '',
              successMessage: '执行数据库操作成功',
            })
          }
        })
      })
    })
  }
  // 删除数据
  remove(collectionName: any, json: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(collectionName).removeOne(json, function (err: any, res: any) {
          if (err) {
            return reject({
              dataStatus: 0,
              errInfo: err,
              errMessage: '执行数据库操作失败',
              successMessage: '',
              result: {},
            })
          } else {
            resolve({
              dataStatus: 1,
              result: res,
              errMessage: '',
              errInfo: '',
              successMessage: '执行数据库操作成功',
            })
          }
        })
      })
    })
  }
  // mongodb里面查询_id需要把字符串转换成对象
  getObjectId(id: any) {
    return new ObjectID(id)
  }
}

module.exports = DB.getInstance()
