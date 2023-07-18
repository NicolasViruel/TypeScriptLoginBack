"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    const token = req.headers.authorization; //('auth-token');
    if (!token)
        return res.status(401).json({ message: 'Access denied' });
    //datos que estaban dentro del token
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || 'tokentest');
    //para tomar ese "userId" tenemos que extender el objeto con typs.d.ts
    req.userId = payload._id;
    console.log(req.userId);
    next();
};
exports.TokenValidation = TokenValidation;
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({
            message: "UnauThorized"
        });
    const token = authHeader.split('')[1];
    if (!token)
        return res.status(401).json({
            message: "UnauThorized"
        });
    // const payload = jwt.verify(token, process.env.JWT_KEY || 'tokentest' , (err , userId) =>{
    //     if (err) return res.status(401).json({
    //         message: "You Are Not UnauThorized"
    //     }) 
    //     // req.userId = payload
    //     next();
    // })   
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=verifyToken.js.map