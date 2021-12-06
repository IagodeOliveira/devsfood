import jwt from "jsonwebtoken";
import { Express } from 'express';
import { Model } from 'sequelize';

declare global {
  namespace Express {
    interface Request {
      user: string | jwt.JwtPayload;
    }
  }
}

interface RequestProducts {
  category?: string;
  page: string;
  search?: string;
}

declare global {
  interface RequestQuery {
    query: RequestProducts;
  }
}

declare global {
  type Obj = {
    name: string;
    email: string;
    password: string;
    state: string;
    city: string;
    address: string;
    phone: string;
  }
}

declare global {
  interface AuthInstance extends Model{
    id: number;
    name: string;
    email: string;
    password: string;
    state: string;
    city: string;
    address: string;
    phone: string;
  }
}

declare global {
  interface CategoriesInstance extends Model{
    id: number;
    image: string;
    name: string;
  }
}

declare global {
  interface OrdersInstance extends Model{
    id: number;
    date: string;
    products: string;
    total: number;
  }
}

