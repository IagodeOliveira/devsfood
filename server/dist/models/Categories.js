"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const sequelize_1 = require("sequelize");
const instances_1 = require("../instances");
exports.Categories = instances_1.sequelize.define('Categories', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'categories',
    timestamps: false
});
