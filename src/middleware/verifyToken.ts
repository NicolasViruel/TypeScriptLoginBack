import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

export const requireAuth = (req: Request , res: Response, next: NextFunction) =>{

    
    const authHeader = req.headers.authorization
    
    if (!authHeader) return res.status(401).json( {
     message: "UnauThorized"   
    })

    const token = authHeader.split(' ')[1]

    if(!token) return res.status(401).json( {
        message: "UnauThorized"   
       }) 
       
     jwt.verify(token, process.env.JWT_KEY || 'tokentest' , (err , user) =>{
        if (err) return res.status(401).json({
            message: "You Are Not UnauThorized"
        }) 
        req.user = user
        console.log(user);
                
        next();
        
    })   
}

   
