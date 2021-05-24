export {}
const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('./db')

class BlackList extends Model {}

BlackList.init(
  {
    //id
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // 自动增长
      primaryKey: true, // 主键字段
    },
    // 创建者id
    creater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 更新者id
    updater_id: {
      type: DataTypes.INTEGER,
    },
    // 创建者角色id
    creater_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 创建者组织id
    creater_organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    belong_organization: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // 是否删除
    is_delete: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // 是否是元数据
    is_metadata: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // 唯一id
    unique_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    // 类型
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 状态
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    // 排序
    sort: {
      type: DataTypes.INTEGER,
    },
    // 分类
    classification: {
      type: DataTypes.INTEGER,
      defaultValue: 333110, //抽象，关于抽象，集合，单体，可用于实体落实，人使用
      allowNull: false,
    },
    // 查询总量
    query_total_num: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    //编辑总量
    edit_total_num: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // 今日查询量
    query_num_today: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // 今日编辑量
    edit_num_today: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    //最后查询时间
    end_search_time: {
      type: DataTypes.INTEGER,
    },
    //最后编辑时间
    end_edit_time: {
      type: DataTypes.INTEGER,
    },
    //资源关系
    resources_relationship: {
      type: DataTypes.STRING(200),
    },
    //最大引用量
    total_quote: {
      type: DataTypes.INTEGER,
    },
    already_quote: {
      type: DataTypes.INTEGER,
    },
    //资源权限
    jurisdiction: {
      type: DataTypes.STRING,
    },
    //等级
    grade: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // 层级
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    //创建时间
    create_date: {
      type: DataTypes.DATE,
    },
    //编辑时间
    edit_date: {
      type: DataTypes.DATE,
    },
    //删除时间
    delete_date: {
      type: DataTypes.DATE,
    },
    //以上为共有默认字段

    // 用户id
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    // 角色id
    role_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    // 组织id
    organization_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    // ip
    ip: {
      type: DataTypes.STRING(30),
      unique: true,
    },
    // url
    url: {
      type: DataTypes.STRING(100),
    },
    expire_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'blacklist',
    indexes: [
      // 设置 索引
      {
        name: 'id',
        fields: ['id'],
      },
      {
        name: 'uniqueId',
        fields: ['unique_id'],
      },
    ],
  },
)

module.exports = {
  BlackList,
}
