import { Router } from "express";
import {singin, singup , profile} from "../controllers/auth.controllers"
import { requireAuth } from "../middleware/verifyToken";

const router: Router = Router();

router.post('/singup' , singup)
router.post('/singin' , singin)
router.get('/profile',requireAuth, profile)

export default router;