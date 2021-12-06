import { DataTypes } from 'sequelize';
import { sequelize } from '../instances';

export const Auth = sequelize.define<AuthInstance>('Auth', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'auth',
  timestamps: false
});