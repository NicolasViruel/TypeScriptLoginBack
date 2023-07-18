"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
//settings
app.set('port', 4000);
//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5173",
    credentials: true
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
//routes
app.use('/api/auth', auth_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map