import { Request , Response } from "express"
import User, {Iuser} from "../models/User";
import jwt from 'jsonwebtoken'


export const signup = async(req: Request , res: Response) =>{

    try {
        const { username, email, password } = req.body;
    
        if (!username) return res.status(400).json({ msg: "The username is required" });
        if (!email) return res.status(400).json({ msg: "Email is required" });
        if (!password) return res.status(400).json({ msg: "The password is required" });
    
        const user = new User({ username, email, password });
        user.password = await user.encryptPassword(user.password);
        const savedUser = await user.save();
    
        // Crear el token
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_KEY || 'tokentest');
        
        res.header('authorization', token).json(savedUser);
      } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error });
      }


};


export const singin = async (req: Request , res: Response) =>{

    const user = await User.findOne({email: req.body.email});
    console.log(user);
    
    //compruebo el correo
    if (!user) return res.status(400).json('Email or Password is wrong');

    //compruebo la contraseña
    const correctPassword: boolean = await user.validatePassword(req.body.password);
    if (!correctPassword)return res.status(400).json('Invalid Password');
    
    //Genero el Token
    const token: string = jwt.sign({
        _id: user.id,
        email: user.email} , process.env.JWT_KEY || 'tokentest', {
        expiresIn: 60 * 60
    });
    
    
    // res.header('authorization', token).json(user) // para recibir por el header
    // return res.header({token:token}).json(user)
    
    return res.json({token})
};

export const profile = async (req: Request , res: Response) =>{
    
    try {
        const user = await User.findById(req.user , {password: 0});
       
        
        if(!user) return res.status(404).json('No User found')  
        
        return res.json({
                    profile:{
                        username: req.user.username,
                        email: req.user.email,
                        _id: req.user._id,
                    },
                    message: "Profile data"
                })
    } catch (error) {
        console.error(error)
        return res.status(500).send({msg:"It's not authorized"});
    }

};