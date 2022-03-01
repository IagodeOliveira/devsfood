"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.newOrder = exports.stripePayment = exports.address = exports.login = exports.newProfile = exports.signUp = exports.createProducts = exports.products = exports.createCategories = exports.categories = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Categories_1 = require("../models/Categories");
const Products_1 = require("../models/Products");
const Auth_1 = require("../models/Auth");
const Orders_1 = require("../models/Orders");
const sequelize_1 = require("sequelize");
const validate_1 = require("./validate");
// import fs from 'fs';
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.Stripe_Secret_Key, {
    apiVersion: '2020-08-27',
});
const categories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let categories = [];
    try {
        const response = yield Categories_1.Categories.findAll();
        for (let i in response) {
            categories.push(response[i].dataValues);
        }
        if (categories.length > 0) {
            res.json({
                error: "",
                result: categories
            });
            return;
        }
        res.json({ error: "An error has happened", result: [] });
    }
    catch (error) {
        console.error(error);
    }
});
exports.categories = categories;
const createCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    for (let i in categories) {
        try {
            yield Categories_1.Categories.create({
                image: categories[i].image,
                name: categories[i].name
            });
        }
        catch (error) {
            console.error(error);
        }
    }
});
exports.createCategories = createCategories;
const products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { category = '0', page, search = '' } = req.query;
    const Category = parseInt(category);
    const Page = parseInt(page);
    let products = [];
    try {
        let allProducts = [];
        if (Category === 0) {
            const response = yield Products_1.Products.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${search}%`
                    }
                },
                offset: 6 * (Page - 1),
                limit: 6
            });
            for (let i in response) {
                products.push(response[i].dataValues);
            }
            if (search !== '') {
                allProducts = yield Products_1.Products.findAll({
                    where: {
                        name: {
                            [sequelize_1.Op.iLike]: `%${search}%`
                        }
                    }
                });
            }
            else {
                allProducts = yield Products_1.Products.findAll();
            }
        }
        if (Category > 0) {
            const response = yield Products_1.Products.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${search}%`
                    },
                    id_cat: Category
                },
                offset: 6 * (Page - 1),
                limit: 6
            });
            for (let i in response) {
                products.push(response[i].dataValues);
            }
            if (search !== '') {
                allProducts = yield Products_1.Products.findAll({
                    where: {
                        name: {
                            [sequelize_1.Op.iLike]: `%${search}%`
                        },
                        id_cat: Category
                    }
                });
            }
            else {
                allProducts = yield Products_1.Products.findAll({
                    where: {
                        id_cat: Category
                    },
                });
            }
        }
        const pages = Math.ceil(allProducts.length / 6);
        if (products.length > 0) {
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
        res.json({ error: "An error has happened", result: [] });
    }
    catch (error) {
        console.error(error);
    }
});
exports.products = products;
const createProducts = (res) => {
    // fs.readFile('products.json', async (error, data: any) => {
    //   if (error) {
    //     res.status(500).end();
    //   } else {
    //     // let products = JSON.parse(data).products;
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
exports.createProducts = createProducts;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = req.body.obj;
    const { error } = (0, validate_1.signUpValidate)(req.body.obj);
    if (error) {
        return res.status(400).send(`User could not be registered: ${error.message}`);
    }
    try {
        const response = yield Auth_1.Auth.findOne({
            where: {
                email: obj.email
            }
        });
        if (response) {
            return res.status(400).send("Email already registered");
        }
        yield Auth_1.Auth.create({
            name: obj.name,
            email: obj.email,
            password: bcryptjs_1.default.hashSync(obj.password, bcryptjs_1.default.genSaltSync(10)),
            state: obj.state,
            city: obj.city,
            address: obj.address,
            phone: obj.phone
        });
        return res.status(200).send("User registered with success");
    }
    catch (error) {
        return res.status(400).send(`User could not be registered: ${error}`);
    }
});
exports.signUp = signUp;
const newProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).send("Restricted Area");
    }
    else {
        const obj = req.body.obj;
        const email = req.body.email;
        let profile = {
            name: obj.name,
            email: obj.email,
            password: bcryptjs_1.default.hashSync(obj.password, bcryptjs_1.default.genSaltSync(10)),
            state: obj.state,
            city: obj.city,
            address: obj.address,
            phone: obj.phone
        };
        const { error } = (0, validate_1.signUpValidate)(req.body.obj);
        if (error) {
            return res.status(400).send(`Profile could not be updated: ${error.message}`);
        }
        try {
            const response = yield Auth_1.Auth.findOne({
                where: { email }
            });
            if (email !== obj.email) {
                const newResponse = yield Auth_1.Auth.findOne({
                    where: { email: obj.email }
                });
                if (newResponse) {
                    return res.status(400).send("Email already exist");
                }
            }
            if (!response) {
                return res.status(400).send("User not found");
            }
            yield Auth_1.Auth.update(profile, { where: { email }
            });
            const newProfile = {
                name: obj.name,
                email: obj.email,
                state: obj.state,
                city: obj.city,
                address: obj.address,
                phone: obj.phone
            };
            return res.status(200).json(newProfile);
        }
        catch (error) {
            return res.status(400).send(`Profile could not be updated: ${error}`);
        }
    }
});
exports.newProfile = newProfile;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email;
    let password = req.body.password;
    try {
        const response = yield Auth_1.Auth.findOne({
            where: { email }
        });
        let user = response.dataValues;
        if (!user) {
            return res.status(400).send("Username or Password incorrect");
        }
        const { error } = (0, validate_1.loginValidate)(req.body);
        if (error) {
            return res.status(400).send(error.message);
        }
        let pass = bcryptjs_1.default.compareSync(password, user.password);
        if (!pass)
            return res.status(400).send("Username or Password incorrect");
        const token = jsonwebtoken_1.default.sign({ name: user.name, email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.header("authorizationtoken", token);
        res.status(201).json(email);
    }
    catch (err) {
        return res.status(400).send("Could not authenticated");
    }
});
exports.login = login;
const address = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email;
    try {
        const response = yield Auth_1.Auth.findOne({
            attributes: { exclude: ['id', 'password', 'email'] },
            where: { email }
        });
        let user = response.dataValues;
        if (!user) {
            return res.status(400).send("User not exist");
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
    }
});
exports.address = address;
const stripePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).send("Restricted Area");
    }
    else {
        let { products } = req.body;
        try {
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: products.map((product) => {
                    return {
                        price_data: {
                            currency: 'brl',
                            product_data: {
                                name: product.name
                            },
                            unit_amount: (+(product.price) * 100).toString()
                        },
                        quantity: (product.amount),
                    };
                }),
                mode: 'payment',
                success_url: `https://devsfood.herokuapp.com/success`,
                cancel_url: `https://devsfood.herokuapp.com/cancel`,
            });
            res.json(session.url);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
});
exports.stripePayment = stripePayment;
const newOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let order = req.body.order;
    try {
        yield Orders_1.Orders.create({
            email: order.email,
            date: order.date,
            products: order.products,
            total: order.total
        });
        res.status(200).send('Order delivered');
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.newOrder = newOrder;
const orders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).send("Restricted Area");
    }
    else {
        let email = req.body.email;
        let orders = [];
        try {
            const response = yield Orders_1.Orders.findAll({
                where: { email },
                order: [
                    ['date', 'DESC']
                ]
            });
            for (let i in response) {
                orders.push(response[i].dataValues);
            }
            if (orders.length > 0) {
                res.json({
                    error: "",
                    result: orders
                });
                return;
            }
            res.json({ error: "An error has happened", result: [] });
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
});
exports.orders = orders;
