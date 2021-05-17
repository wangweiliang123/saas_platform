'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var Sequelize = require('sequelize')
var mysqlConfig = require('../../configs/mysql.config')
// 使用sequelize操作数据库，必须导入数据库依赖包，这里导的是mysql2
var sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  dialect: 'mysql',
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'create_date',
    updatedAt: 'update_date',
    deletedAt: 'delete_date',
    underscored: true, // 开启下划线命名方式，默认是驼峰命名
  },
})
sequelize.sync({
  force: false, // 每次启动都重新自动创建表
})
module.exports = {
  sequelize: sequelize,
}
