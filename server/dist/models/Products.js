"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const sequelize_1 = require("sequelize");
const instances_1 = require("../instances");
exports.Products = instances_1.sequelize.define('Products', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    id_cat: {
        type: sequelize_1.DataTypes.INTEGER
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    },
    ingredients: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT
    }
}, {
    tableName: 'products',
    timestamps: false
});
