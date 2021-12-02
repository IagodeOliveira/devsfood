import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import { Categories } from '../models/Categories';
import { Products } from '../models/Products';
import { Auth } from '../models/Auth';
import { Orders } from '../models/Orders';
import { Sequelize, Op } from 'sequelize';
import { signUpValidate, loginValidate } from './validate';

dotenv.config();

  interface RequestProducts {
    category?: string;
    page: string;
    search?: string;
  }

  interface RequestQuery {
    query: RequestProducts;
  }

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
    console.log(error);
  }
};

export const createCategories = async (req: Request, res: Response) => {
  // let categories = [
  //   {
  //     image: '/assets/cat/pie',
  //     name: 'Pies'
  //   }, {
  //     image: '/assets/cat/donut',
  //     name: 'Donuts'
  //   }, {
  //     image: '/assets/cat/cookies',
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
  //     console.log(error);
  //   }
  // }
};

export const products = async (req: RequestQuery, res: Response) => {
  let { category = '0', page, search = '' } = req.query;

  const Category = parseInt(category);
  const Page = parseInt(page);

  console.log(Category, Page, search);

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
    console.log(error);
  }
};

//C:\Users\iago\Desktop\Programação\Códigos\Devs_Food\devsfood\public\assets\prod

export const createProducts = async (req: Request, res: Response) => {
  // let products = [
  //   {
  //     id_cat: 1,
  //     image: '/assets/prod/chocolate-pie.png',
  //     ingredients: 'bittersweet chocolate, cornstarch, whole milk, salt, sugar, egg yolk, butter, whipped cream, vanilla extract',
  //     name: 'Chocolate Pie',
  //     price: 60
  //   },

  //   {
  //     id_cat: 1,
  //     image: '/assets/prod/cherry-pie.png',
  //     ingredients: 'cherry, sugar, lemon juice, cornstarch, vinegar, egg, salted butter, flour, kosher salt',
  //     name: 'Cherry Pie',
  //     price: 55
  //   }, 

  //   {
  //     id_cat: 1,
  //     image: '/assets/prod/strawberry-pie.png',
  //     ingredients: 'strawberries, pie crust, granulated sugar, vanilla extract, cornstarch, whipped cream',
  //     name: 'Strawberry  Pie',
  //     price: 55
  //   }, 

  //   {
  //     id_cat: 2,
  //     image: '/assets/cat/chocolate-donut.png',
  //     ingredients: 'chocolate icing, chocolate sprinkles, wheat flour, starch, whey, egg, sugar, salt',
  //     name: 'Chocolate Frosted Donut',
  //     price: 10
  //   }, 

  //   {
  //     id_cat: 2,
  //     image: '/assets/cat/double-donut.png',
  //     ingredients: 'chocolate icing, wheat flour, starch, whey, egg white, sugar, salt',
  //     name: 'Double Chocolate Donut',
  //     price: 18
  //   }, 

  //   {
  //     id_cat: 2,
  //     image: '/assets/cat/strawberry-donut.png',
  //     ingredients: 'strawberry icing, wheat flour, nonfat dry milk, sugar, cornstarch, salt, ',
  //     name: 'Strawberry Sprinkles Donut',
  //     price: 12
  //   }, 

  //   {
  //     id_cat: 3,
  //     image: '/assets/prod/oatmeal-cookies.png',
  //     ingredients: 'oats, brown sugar, salt, egg, butter, vanilla extract, baking soda, flour',
  //     name: 'Oatmeal Cookies',
  //     price: 25
  //   },
  // ];
  // for(let i in products) {
  //   try {
  //     await Products.create({
  //       id_cat: products[i].id_cat,
  //       image: products[i].image,
  //       ingredients: products[i].ingredients,
  //       name: products[i].name,
  //       price: products[i].price
  //     });
  //   } catch(error) {
  //     console.log(error);
  //   }
  // }
};

// export const nome = (req: Request, res: Response) => {
//   let nome = req.params.nome;
//   res.json( { nome: `Tu sent the name: ${nome}` });
// };

// export const createPhrase = async (req: Request, res: Response) => {
//   let { author, txt } = req.body;
//   // res.json( { corpo: req.body });
//   let newPhrase = await Categories.create({author, txt});
//   res.json({ id: newPhrase.id, author, txt });
// };

// export const getPhrase = async (req: Request, res: Response) => {
//   let { id } = req.params;
//   let phrase = await Categories.findByPk(id);
//   if(phrase) {
//     res.json({ phrase });
//   } else {
//     res.status(404);
//     res.json({ error: 'Phrase not found' });
//   }
// };

// export const updatePhrase = async (req: Request, res: Response) => {
//   let { id } = req.params;
//   let { author, txt } = req.body;

//   let phrase = await Categories.findByPk(id);
//   if(phrase) {
//     phrase.author = author;
//     phrase.txt = txt;
//     await phrase.save();
//     res.json({ phrase });
//   } else {
//     res.status(404);
//     res.json({ error: 'Phrase not found' });
//   }
// };

// export const randomPhrase = async (req: Request, res: Response) => {
//   let phrase = await Categories.findOne({
//     order: [
//       Sequelize.fn('RANDOM')
//     ]
//   });
//   if(phrase) {
//     res.json({ phrase });
//   } else {
//     res.json({ error: 'Phrase not found' });
//   }
// };

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
    // await Auth.create({
    //   name: obj.name,
    //   email: obj.email,
    //   password: bcrypt.hashSync(obj.password, bcrypt.genSaltSync(10)),
    //   state: obj.state,
    //   city: obj.city,
    //   address: obj.address,
    //   phone: obj.phone
    // });
    return res.status(200).send("User registered with success");
  } catch (error) {
    return res.status(400).send(`User could not be registered: ${error}`);
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
      { expiresIn: 1800 }
    );

    console.log(token);

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
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const newOrder = async (req: Request, res: Response) => {
  let order = req.body.order;
  try {
    await Orders.create({
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
  let orders = [];
  try {
    const response: any = await Orders.findAll();
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
};

