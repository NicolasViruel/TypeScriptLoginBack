import { Router } from "express";
import {singin, signup , profile} from "../controllers/auth.controllers"
import { requireAuth } from "../middleware/verifyToken";

const router: Router = Router();

router.post('/signup' , signup)
router.post('/singin' , singin)
router.get('/profile',requireAuth, profile)

export default router;