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
// import fs from 'fs';
import Stripe from 'stripe';


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



dotenv.config();


const stripe = new Stripe((process.env.Stripe_Secret_Key as string), {
  apiVersion: '2020-08-27',
});

export const categories = async (req: Request, res: Response) => {
  let categories = [];
  try {
    const response: any = await Categories.findAll();
    console.log(response);
    for(let i in response) {
      categories.push(response[i].dataValues);
    }
    if(categories.length > 0) {
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
  let categories = [
    {
      image: '/assets/cat/pie.png',
      name: 'Pies'
    }, {
      image: '/assets/cat/donut.png',
      name: 'Donuts'
    }, {
      image: '/assets/cat/cookies.png',
      name: 'Cookies'
    }
  ];
  for(let i in categories) {
    try {
      console.log('12');
      await Categories.create({
        image: categories[i].image,
        name: categories[i].name
      });
    } catch(error) {
      console.error(error);
    }
  }
};

export const products = async (req: RequestQuery, res: Response) => {
  let { category = '0', page = '1', search = '' } = req.query;

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
  //     // let products = JSON.parse(data).products;
  //     let products = [
  //         {
  //           id_cat: 1,
  //           image: "/assets/prod/chocolate-pie.png",
  //           ingredients: "bittersweet chocolate, cornstarch, whole milk, salt, sugar, egg yolk, butter, whipped cream, vanilla extract",
  //           name: "Chocolate Pie",
  //           price: 60
  //         },
      
  //         {
  //           id_cat: 1,
  //           image: "/assets/prod/cherry-pie.png",
  //           ingredients: "cherry, sugar, lemon juice, cornstarch, vinegar, egg, salted butter, flour, kosher salt",
  //           name: "Cherry Pie",
  //           price: 55
  //         }, 
      
  //         {
  //           id_cat: 1,
  //           image: "/assets/prod/strawberry-pie.png",
  //           ingredients: "strawberries, pie crust, granulated sugar, vanilla extract, cornstarch, whipped cream",
  //           name: "Strawberry  Pie",
  //           price: 55
  //         }, 
      
  //         {
  //           id_cat: 2,
  //           image: "/assets/cat/chocolate-donut.png",
  //           ingredients: "chocolate icing, chocolate sprinkles, wheat flour, starch, whey, egg, sugar, salt",
  //           name: "Chocolate Frosted Donut",
  //           price: 10
  //         }, 
      
  //         {
  //           id_cat: 2,
  //           image: "/assets/cat/double-donut.png",
  //           ingredients: "chocolate icing, wheat flour, starch, whey, egg white, sugar, salt",
  //           name: "Double Chocolate Donut",
  //           price: 18
  //         }, 
      
  //         {
  //           id_cat: 2,
  //           image: "/assets/cat/strawberry-donut.png",
  //           ingredients: "strawberry icing, wheat flour, nonfat dry milk, sugar, cornstarch, salt, ",
  //           name: "Strawberry Sprinkles Donut",
  //           price: 12
  //         }, 
      
  //         {
  //           id_cat: 3,
  //           image: "/assets/prod/oatmeal-cookies.png",
  //           ingredients: "oats, brown sugar, salt, egg, butter, vanilla extract, baking soda, flour",
  //           name: "Oatmeal Cookies",
  //           price: 25
  //         },
  //         {
  //           id_cat: 1,
  //           image: "/assets/prod/lime-pie.png",
  //           ingredients: "lime juice, lime zest, cream cheese, condensed milk, heavy cream, crackers, brown sugar, melted butter, whipped cream",
  //           name: "CLime Pie",
  //           price: 80
  //         },
      
  //         {
  //           id_cat: 1,
  //           image: "/assets/prod/coconut-pie.png",
  //           ingredients: "shredded coconut, canned coconut milk, cornstarch, salt, sugar, egg yolk, butter, whipped cream, vanilla extract, coconut extract",
  //           name: "Coconut Cream Pie",
  //           price: 86
  //         },
      
  //         {
  //           id_cat: 1,
  //           image: "/assets/prod/lemon-strawberry.png",
  //           ingredients: "strawberries, strawberry Jello, lemon slices, cream cheese, cornstarch, sugar, lemon curd, cool whip",
  //           name: "Lemon Cream Strawberry Pie",
  //           price: 92
  //         },
      
  //         {
  //           id_cat: 1,
  //           image: "/assets/prod/puff-pie.png",
  //           ingredients: "semi-sweet chocolate chips, egg, heavy cream, milk, flour, butter, salt, granulated sugar, white chocolate pudding mix",
  //           name: "Cream Puff Pie",
  //           price: 98
  //         },
      
  //         {
  //           id_cat: 3,
  //           image: "/assets/prod/creme-cookies.png",
  //           ingredients: "oats, dark brown sugar, cinnamon, salt, egg, butter, vanilla extract, baking soda, all-purpose flour",
  //           name: "Oatmeal Creme Cookies",
  //           price: 27
  //         },
      
  //         {
  //           id_cat: 3,
  //           image: "/assets/prod/pumpkin-cookies.png",
  //           ingredients: "pure canned pumpkin, pumpkin pie spice, cream cheese, granulated sugar, cinnamon, salt, butter, vanilla extract, baking soda, all-purpose flour",
  //           name: "Pumpkin Cheesecake Cookies",
  //           price: 29
  //         },
      
  //         {
  //           id_cat: 3,
  //           image: "/assets/prod/raspberry-cookies.png",
  //           ingredients: "almond, raspberry jam, cream of tartar, granulated sugar, egg, kosher salt, salted butter, almond extract, baking soda, all-purpose flour, vegetable oil",
  //           name: "Almond Raspberry Cookies",
  //           price: 31
  //         }
  //       ]
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

// export const signUp = async (req: Request, res: Response) => {
//   const obj = req.body.obj;
//   const { error } = signUpValidate(req.body.obj);
//   if (error) {
//     return res.status(400).send(`User could not be registered: ${error.message}`);
//   }
//   try {
//     const response = await Auth.findOne({
//       where: {
//         email: obj.email
//       }
//     });

//     if(response) {
//       return res.status(400).send("Email already registered");
//     }
//     await Auth.create({
//       name: obj.name,
//       email: obj.email,
//       password: bcrypt.hashSync(obj.password, bcrypt.genSaltSync(10)),
//       state: obj.state,
//       city: obj.city,
//       address: obj.address,
//       phone: obj.phone
//     });
//     return res.status(200).send("User registered with success");
//   } catch (error) {
//     return res.status(400).send(`User could not be registered: ${error}`);
//   }
// };

// export const newProfile = async (req: Request, res: Response) => {
//   if (!req.user) {
//     return res.status(401).send("Restricted Area");
//   } else {
//     const obj = req.body.obj;
//     const email = req.body.email;

//     let profile = {
//       name: obj.name,
//       email: obj.email,
//       password: bcrypt.hashSync(obj.password, bcrypt.genSaltSync(10)),
//       state: obj.state,
//       city: obj.city,
//       address: obj.address,
//       phone: obj.phone
//     };

//     const { error } = signUpValidate(req.body.obj);
//     if (error) {
//       return res.status(400).send(`Profile could not be updated: ${error.message}`);
//     }

//     try {
//       const response: any = await Auth.findOne({
//         where: { email }
//       });

//       if(email !== obj.email) {
//         const newResponse: any = await Auth.findOne({
//           where: { email: obj.email }
//         });
//         if(newResponse) {
//           return res.status(400).send("Email already exist");
//         }
//       }

//       if(!response) {
//         return res.status(400).send("User not found");
//       }

//       await Auth.update(profile,
//         {where: 
//           { email }
//         }
//       );

//       const newProfile = {
//         name: obj.name,
//         email: obj.email,
//         state: obj.state,
//         city: obj.city,
//         address: obj.address,
//         phone: obj.phone
//       };

//       return res.status(200).json(newProfile);
//     } catch (error) {
//       return res.status(400).send(`Profile could not be updated: ${error}`);
//     }
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   try {
//     const response: any = await Auth.findOne({
//       where: { email }
//     });
//     let user = response.dataValues;

//     if (!user) {
//       return res.status(400).send("Username or Password incorrect");
//     }

//     const { error } = loginValidate(req.body);
//     if (error) {
//       return res.status(400).send(error.message);
//     }

//     let pass = bcrypt.compareSync(password, user.password);
//     if (!pass) return res.status(400).send("Username or Password incorrect");

//     const token = jwt.sign(
//       { name: user.name, email },
//       (process.env.TOKEN_SECRET as string),
//       { expiresIn: '1h' }
//     );

//     res.header("authorizationtoken", token);
//     res.status(201).json(email);

//   } catch (err) {
//     return res.status(400).send("Could not authenticated");
//   }
// };

// export const address = async (req: Request, res: Response) => {
//   let email = req.body.email;

//   try {
//     const response: any = await Auth.findOne({
//       attributes: {exclude: ['id', 'password', 'email']},
//       where: { email }
//     });
//     let user = response.dataValues;

//     if (!user) {
//       return res.status(400).send("User not exist");
//     }
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const stripePayment = async (req: Request, res: Response) => {
//   if (!req.user) {
//     return res.status(401).send("Restricted Area");
//   } else {
//     let { products } = req.body;
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: products.map((product: any) => {
//           return {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: product.name
//               },
//               unit_amount: (+(product.price) * 100).toString()
//             },
//             quantity: (product.amount),
//           }
//         }),
//         mode: 'payment',
//         success_url: `https://devsfood.herokuapp.com/success`,
//         cancel_url: `https://devsfood.herokuapp.com/cancel`,
//       });
//       res.json(session.url);
//     } catch(e: any) {
//       res.status(500).json({ error: e.message });
//     }
//   }
// }

// export const newOrder = async (req: Request, res: Response) => {
//   let order = req.body.order;
//   try {
//     await Orders.create({
//       email: order.email,
//       date: order.date,
//       products: order.products,
//       total: order.total
//     });
//     res.status(200).send('Order delivered');
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// export const orders = async (req: Request, res: Response) => {
//   if (!req.user) {
//     return res.status(401).send("Restricted Area");
//   } else {
//     let email = req.body.email;
//     let orders = [];
//     try {
//       const response: any = await Orders.findAll({
//         where: { email },
//         order: [
//           ['date', 'DESC']
//         ]
//       });
//       for(let i in response) {
//         orders.push(response[i].dataValues);
//       }
//       if(orders.length > 0) {
//         res.json({ 
//           error: "",
//           result: orders
//         });
//         return;
//       } 
//       res.json({error: "An error has happened", result: []});

//     } catch (error) {
//       res.status(400).send(error);
//     }
//   }
//};

