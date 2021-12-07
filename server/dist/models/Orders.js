"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const sequelize_1 = require("sequelize");
const instances_1 = require("../instances");
exports.Orders = instances_1.sequelize.define('Orders', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    date: {
        type: sequelize_1.DataTypes.STRING
    },
    products: {
        type: sequelize_1.DataTypes.STRING
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT
    },
}, {
    tableName: 'orders',
    timestamps: false
});
