export {}
const Sequelize = require('sequelize')
const mysqlConfig = require('../../configs/mysql.config')
// 使用sequelize操作数据库，必须导入数据库依赖包，这里导的是mysql2
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  dialect: 'mysql',
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  logging: true, // 是否显示SQL语句
  timezone: '+08:00', // 时区，如果没有设置，会导致数据库中的时间字段与中国时区时间相差8小时
  define: {
    timestamps: false, // 是否自动创建时间字段， 默认会自动创建createdAt、updatedAt
    paranoid: false, // 是否自动创建deletedAt字段
    underscored: true, // 开启下划线命名方式，默认是驼峰命名
  },
})

sequelize.sync({
  force: false, // 每次启动都重新自动创建表
})

module.exports = {
  sequelize,
}
