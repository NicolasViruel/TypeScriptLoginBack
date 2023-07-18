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
exports.profile = exports.singin = exports.singup = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const singup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username)
        return res.status(400).send({ msg: "The username is required" });
    if (!email)
        return res.status(400).send({ msg: "Email is required" });
    if (!password)
        return res.status(400).send({ msg: "The password is required" });
    const user = new User_1.default({
        username,
        email,
        password,
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    // Creando el Token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.JWT_KEY || 'tokentest');
    res.header('authorization', token).json(savedUser);
});
exports.singup = singup;
const singin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    //compruebo el correo
    if (!user)
        return res.status(400).json('Email or Password is wrong');
    //compruebo la contraseña
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(400).json('Invalid Password');
    //Genero el Token
    const token = jsonwebtoken_1.default.sign({
        _id: user.id,
        email: user.email
    }, process.env.JWT_KEY || 'tokentest', {
        expiresIn: 60 * 60
    });
    // res.header('authorization', token).json(user) // para recibir por el header
    // return res.header({token:token}).json(user)
    return res.json({ token });
});
exports.singin = singin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user, { password: 0 });
        if (!user)
            return res.status(404).json('No User found');
        return res.json({
            profile: {
                username: req.user.username,
                email: req.user.email,
                _id: req.user._id,
            },
            message: "Profile data"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ msg: "It's not authorized" });
    }
});
exports.profile = profile;
//# sourceMappingURL=auth.controllers.js.map