import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import { Categories } from '../models/Categories';
import { Products } from '../models/Products';
import { Auth } from '../models/Auth';
import { Orders } from '../models/Orders';
import { Op } from 'sequelize';
import { signUpValidate, loginValidate } from './validate';
import fs from 'fs';
import Stripe from 'stripe';

dotenv.config();

const stripe = new Stripe((process.env.Stripe_Secret_Key as string), {
  apiVersion: '2020-08-27',
});

export const categories = async (req: Request, res: Response) => {
  let categories = [];
  try {
    const response: any = await Categories.findAll();
    for(let i in response) {
      categories.push(response[i].dataValues);
    }
    if(categories.length === 3) {
      res.json({
        error: "",
        result: categories
      });
      return;
    } 
    res.json({error: "An error has happened", result: []});
  } catch (error) {
    console.error(error);
  }
};

export const createCategories = async (req: Request, res: Response) => {
  // let categories = [
  //   {
  //     image: '/assets/cat/pie.png',
  //     name: 'Pies'
  //   }, {
  //     image: '/assets/cat/donut.png',
  //     name: 'Donuts'
  //   }, {
  //     image: '/assets/cat/cookies.png',
  //     name: 'Cookies'
  //   }
  // ];
  // for(let i in categories) {
  //   try {
  //     await Categories.create({
  //       image: categories[i].image,
  //       name: categories[i].name
  //     });
  //   } catch(error) {
  //     console.error(error);
  //   }
  // }
};

export const products = async (req: RequestQuery, res: Response) => {
  let { category = '0', page, search = '' } = req.query;

  const Category = parseInt(category);
  const Page = parseInt(page);

  let products = [];
  try {

    let allProducts = [];

    if(Category === 0) {
      const response: any = await Products.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`
          }
        },
        offset: 6 * (Page - 1),
        limit: 6
      });
      for(let i in response) {
        products.push(response[i].dataValues);
      }
      if(search !== '') {
        allProducts = await Products.findAll({
          where: {
            name: {
              [Op.iLike]: `%${search}%`
            }
          }
        });
      } else {
        allProducts = await Products.findAll();
      }
    }

    if(Category > 0) {
      const response: any = await Products.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`
          },
          id_cat: Category
        },
        offset: 6 * (Page - 1),
        limit: 6
      });
      for(let i in response) {
        products.push(response[i].dataValues);
      }
      if(search !== '') {
        allProducts = await Products.findAll({
          where: {
            name: {
              [Op.iLike]: `%${search}%`
            },
            id_cat: Category
          }
        });
      } else {
        allProducts = await Products.findAll({
          where: {
            id_cat: Category
          },
        });
      }
    }

    const pages = Math.ceil(allProducts.length / 6);

    if(products.length > 0) {
      res.json({
        error: "",
        result: {
          data: products,
          page: Page,
          pages,
          total: allProducts.length
        }
      });
      return;
    } 
    res.json({error: "An error has happened", result: []});
  } catch (error) {
    console.error(error);
  }
};

export const createProducts = (res: Response) => {
  // fs.readFile('products.json', async (error, data: any) => {
  //   if (error) {
  //     res.status(500).end();
  //   } else {
  //     let products = JSON.parse(data).products;
  //     for(let i in products) {
  //     try {
  //       await Products.create({
  //         id_cat: products[i].id_cat,
  //         image: products[i].image,
  //         ingredients: products[i].ingredients,
  //         name: products[i].name,
  //         price: products[i].price
  //       });
  //     } catch(error) {
  //       console.error(error);
  //     }
  //   }
  // }})
};

export const signUp = async (req: Request, res: Response) => {
  const obj = req.body.obj;
  const { error } = signUpValidate(req.body.obj);
  if (error) {
    return res.status(400).send(`User could not be registered: ${error.message}`);
  }
  try {
    const response = await Auth.findOne({
      where: {
        email: obj.email
      }
    });

    if(response) {
      return res.status(400).send("Email already registered");
    }
    await Auth.create({
      name: obj.name,
      email: obj.email,
      password: bcrypt.hashSync(obj.password, bcrypt.genSaltSync(10)),
      state: obj.state,
      city: obj.city,
      address: obj.address,
      phone: obj.phone
    });
    return res.status(200).send("User registered with success");
  } catch (error) {
    return res.status(400).send(`User could not be registered: ${error}`);
  }
};

export const newProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send("Restricted Area");
  } else {
    const obj = req.body.obj;
    const email = req.body.email;

    let profile = {
      name: obj.name,
      email: obj.email,
      password: bcrypt.hashSync(obj.password, bcrypt.genSaltSync(10)),
      state: obj.state,
      city: obj.city,
      address: obj.address,
      phone: obj.phone
    };

    const { error } = signUpValidate(req.body.obj);
    if (error) {
      return res.status(400).send(`Profile could not be updated: ${error.message}`);
    }

    try {
      const response: any = await Auth.findOne({
        where: { email }
      });

      if(email !== obj.email) {
        const newResponse: any = await Auth.findOne({
          where: { email: obj.email }
        });
        if(newResponse) {
          return res.status(400).send("Email already exist");
        }
      }

      if(!response) {
        return res.status(400).send("User not found");
      }

      await Auth.update(profile,
        {where: 
          { email }
        }
      );

      const newProfile = {
        name: obj.name,
        email: obj.email,
        state: obj.state,
        city: obj.city,
        address: obj.address,
        phone: obj.phone
      };

      return res.status(200).json(newProfile);
    } catch (error) {
      return res.status(400).send(`Profile could not be updated: ${error}`);
    }
  }
};

export const login = async (req: Request, res: Response) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    const response: any = await Auth.findOne({
      where: { email }
    });
    let user = response.dataValues;

    if (!user) {
      return res.status(400).send("Username or Password incorrect");
    }

    const { error } = loginValidate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    let pass = bcrypt.compareSync(password, user.password);
    if (!pass) return res.status(400).send("Username or Password incorrect");

    const token = jwt.sign(
      { name: user.name, email },
      (process.env.TOKEN_SECRET as string),
      { expiresIn: '1h' }
    );

    res.header("authorizationtoken", token);
    res.status(201).json(email);

  } catch (err) {
    return res.status(400).send("Could not authenticated");
  }
};

export const address = async (req: Request, res: Response) => {
  let email = req.body.email;

  try {
    const response: any = await Auth.findOne({
      attributes: {exclude: ['id', 'password', 'email']},
      where: { email }
    });
    let user = response.dataValues;

    if (!user) {
      return res.status(400).send("User not exist");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

export const stripePayment = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send("Restricted Area");
  } else {
    let { products } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map((product: any) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.name
              },
              unit_amount: (+(product.price) * 100).toString()
            },
            quantity: (product.amount),
          }
        }),
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cancel`,
      });
      res.json(session.url);
    } catch(e: any) {
      res.status(500).json({ error: e.message });
    }
  }
}

export const newOrder = async (req: Request, res: Response) => {
  let order = req.body.order;
  try {
    await Orders.create({
      email: order.email,
      date: order.date,
      products: order.products,
      total: order.total
    });
    res.status(200).send('Order delivered');
  } catch (error) {
    res.status(400).send(error);
  }
};

export const orders = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send("Restricted Area");
  } else {
    let email = req.body.email;
    let orders = [];
    try {
      const response: any = await Orders.findAll({
        where: { email },
        order: [
          ['date', 'DESC']
        ]
      });
      for(let i in response) {
        orders.push(response[i].dataValues);
      }
      if(orders.length > 0) {
        res.json({ 
          error: "",
          result: orders
        });
        return;
      } 
      res.json({error: "An error has happened", result: []});

    } catch (error) {
      res.status(400).send(error);
    }
  }
};

