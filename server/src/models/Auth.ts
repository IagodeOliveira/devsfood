import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances';

export interface AuthInstance extends Model{
  id: number;
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
  address: string;
  phone: string;
}

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