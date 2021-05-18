"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('sequelize'), Sequelize = _a.Sequelize, Model = _a.Model;
var sequelize = require('./db').sequelize;
var BlackList = /** @class */ (function (_super) {
    __extends(BlackList, _super);
    function BlackList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BlackList;
}(Model));
BlackList.init({
    //id
    id: {
        type: Sequelize.INTEGER(12),
        autoIncrement: true,
        primaryKey: true, // 主键字段
    },
    // 创建者id
    creater_id: {
        type: Sequelize.INTEGER(12),
        allowNull: false,
    },
    // 更新者id
    updater_id: {
        type: Sequelize.INTEGER(12),
    },
    // 创建者角色id
    creater_role_id: {
        type: Sequelize.INTEGER(12),
        allowNull: false,
    },
    // 创建者组织id
    creater_organization_id: {
        type: Sequelize.INTEGER(12),
        allowNull: false,
    },
    // 是否删除
    is_delete: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0,
    },
    // 是否是元数据
    is_metadata: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    // 唯一id
    unique_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },
    // 类型
    type: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
    },
    // 状态
    status: {
        type: Sequelize.INTEGER(2),
        defaultValue: 1,
    },
    // 排序
    sort: {
        type: Sequelize.INTEGER(12),
    },
    // 分类
    classification: {
        type: Sequelize.INTEGER(12),
        defaultValue: 333110,
        allowNull: false,
    },
    // 查询总量
    query_total_num: {
        type: Sequelize.INTEGER(2),
        defaultValue: 0,
    },
    //编辑总量
    edit_total_num: {
        type: Sequelize.INTEGER(2),
        defaultValue: 0,
    },
    // 今日查询量
    query_num_today: {
        type: Sequelize.INTEGER(2),
        defaultValue: 0,
    },
    // 今日编辑量
    edit_num_today: {
        type: Sequelize.INTEGER(2),
        defaultValue: 0,
    },
    //最后查询时间
    end_search_time: {
        typ: Sequelize.INTEGER(20),
    },
    //最后编辑时间
    end_edit_time: {
        typ: Sequelize.INTEGER(20),
    },
    //资源关系
    resources_relationship: {
        type: Sequelize.STRING(200),
    },
    //最大引用量
    total_quote: {
        typ: Sequelize.INTEGER(12),
    },
    already_quote: {
        typ: Sequelize.INTEGER(12),
    },
    //资源权限
    jurisdiction: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    //等级
    grade: {
        type: Sequelize.INTEGER(2),
        defaultValue: 0,
    },
    // 层级
    level: {
        type: Sequelize.INTEGER(12),
        defaultValue: 0,
    },
    //以上为共有默认字段
    // 用户id
    user_id: {
        type: Sequelize.INTEGER(12),
    },
    // 角色id
    role_id: {
        type: Sequelize.INTEGER(12),
    },
    // 组织id
    organization_id: {
        type: Sequelize.INTEGER(12),
    },
    // ip
    ip: {
        type: Sequelize.STRING(30),
    },
    // url
    url: {
        type: Sequelize.STRING(100),
    },
    expire_date: {
        type: Sequelize.DATE,
    },
}, {
    sequelize: sequelize,
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
});
module.exports = {
    BlackList: BlackList,
};
