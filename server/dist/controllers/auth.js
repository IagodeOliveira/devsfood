"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => {
    const token = req.header("authtoken");
    if (!token || token === "null") {
        return res.status(401).send("Restricted Area");
    }
    try {
        const userVerified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;
        next();
    }
    catch (err) {
        return res.status(401).send("Restricted Area");
    }
};
exports.auth = auth;
exports.default = exports.auth;
