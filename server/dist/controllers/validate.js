"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = exports.signUpValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpValidate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(1).max(50),
        email: joi_1.default.string().required().min(2).max(50),
        password: joi_1.default.string().required().min(6).max(100),
        state: joi_1.default.string().required().min(3).max(20),
        city: joi_1.default.string().required().min(3).max(20),
        address: joi_1.default.string().required().min(6).max(50),
        phone: joi_1.default.string().required().min(15).max(15),
    });
    return schema.validate(data);
};
exports.signUpValidate = signUpValidate;
const loginValidate = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().min(2).max(50),
        password: joi_1.default.string().required().min(6).max(100),
    });
    return schema.validate(data);
};
exports.loginValidate = loginValidate;
