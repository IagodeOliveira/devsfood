import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances';

export interface CategoriesInstance extends Model{
  id: number;
  image: string;
  name: string;
}

export const Categories = sequelize.define<CategoriesInstance>('Categories', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'categories',
  timestamps: false
});