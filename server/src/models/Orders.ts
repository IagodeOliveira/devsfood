import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances';

export interface OrdersInstance extends Model{
  id: number;
  date: string;
  products: string;
  total: number;
}

export const Orders = sequelize.define<OrdersInstance>('Orders', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
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