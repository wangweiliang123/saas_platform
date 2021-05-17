export {}
const { Sequelize, Model } = require('sequelize')
const bcryptjs = require('bcryptjs')
const { sequelize } = require('./db')

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER(11),
      autoIncrement: true, // 自动增长
      primaryKey: true, // 主键字段
    },
    nickname: Sequelize.STRING(128),
    password: {
      type: Sequelize.STRING(512),
      // 对密码进行加密，监听属性，使用了观察者模式，当password属性值被改变时，就执行下面的操作，观察者模式在vue中使用的很多
      set(val: string) {
        const salt = bcryptjs.genSaltSync(10)
        const pwd = bcryptjs.hashSync(val, salt)
        // 将password属性的属性值设置为pwd
        User.setDataValue('password', pwd)
      },
    },
    email: {
      type: Sequelize.STRING(128),
      unique: true,
    },
    openid: {
      type: Sequelize.STRING(128),
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'user', // 如果不设置tableName，自动生成的数据库中的user表的表名为Users
    indexes: [
      // 设置 索引
      {
        name: 'id',
        fields: ['id'],
      },
    ],
  },
)

module.exports = {
  User,
}
