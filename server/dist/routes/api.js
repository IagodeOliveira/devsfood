"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController = __importStar(require("../controllers/apiController"));
const router = (0, express_1.Router)();
const auth_1 = __importDefault(require("../controllers/auth"));
router.get('/categories', apiController.categories);
router.get('/products', apiController.products);
router.get('/cat', apiController.createCategories);
router.get('/prod', apiController.createProducts);
router.post('/auth/signup', apiController.signUp);
router.post('/auth/login', apiController.login);
router.post('/auth/newProfile', auth_1.default, apiController.newProfile);
router.post('/address', apiController.address);
router.post('/newOrder', apiController.newOrder);
router.post('/orders', auth_1.default, apiController.orders);
router.post('/payments', auth_1.default, apiController.stripePayment);
exports.default = router;
