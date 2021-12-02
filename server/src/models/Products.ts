import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances';

export interface ProductsInstance extends Model{
  id: number;
  id_cat: number;
  image: string;
  ingredients: string;
  name: string;
  price: number;
}

export const Products = sequelize.define<ProductsInstance>('Products', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  id_cat: {
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING
  },
  ingredients: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  }
}, {
  tableName: 'products',
  timestamps: false
});