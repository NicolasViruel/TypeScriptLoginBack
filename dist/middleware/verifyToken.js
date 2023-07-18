"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({
            message: "UnauThorized"
        });
    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({
            message: "UnauThorized"
        });
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || 'tokentest', (err, user) => {
        if (err)
            return res.status(401).json({
                message: "You Are Not UnauThorized"
            });
        req.user = user;
        console.log(user);
        next();
    });
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=verifyToken.js.map