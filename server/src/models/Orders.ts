import { DataTypes } from 'sequelize';
import { sequelize } from '../instances';

export const Orders = sequelize.define<OrdersInstance>('Orders', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.STRING
  },
  products: {
    type: DataTypes.STRING
  },
  total: {
    type: DataTypes.FLOAT
  },
}, {
  tableName: 'orders',
  timestamps: false
});