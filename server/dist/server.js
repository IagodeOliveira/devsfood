"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/', api_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../build")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../build/index.html"));
});
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Page not Found' });
});
app.listen(PORT, () => {
    console.log('App Running');
});
