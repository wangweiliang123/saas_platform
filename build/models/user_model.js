'use strict'
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
Object.defineProperty(exports, '__esModule', { value: true })
var _a = require('sequelize'),
  Sequelize = _a.Sequelize,
  Model = _a.Model
var bcryptjs = require('bcryptjs')
var sequelize = require('./db').sequelize
var User = /** @class */ (function (_super) {
  __extends(User, _super)
  function User() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  return User
})(Model)
User.init(
  {
    id: {
      type: Sequelize.INTEGER(11),
      autoIncrement: true,
      primaryKey: true, // 主键字段
    },
    nickname: Sequelize.STRING(128),
    password: {
      type: Sequelize.STRING(512),
      // 对密码进行加密，监听属性，使用了观察者模式，当password属性值被改变时，就执行下面的操作，观察者模式在vue中使用的很多
      set: function (val) {
        var salt = bcryptjs.genSaltSync(10)
        var pwd = bcryptjs.hashSync(val, salt)
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
    sequelize: sequelize,
    tableName: 'user',
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
  User: User,
}
