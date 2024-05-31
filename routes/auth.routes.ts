import express from "express";
import authController from '../controllers/auth-controller';
import { validator, validatorParams } from "../middleware/auth-validator";
const router = express.Router();


router.post('/',validatorParams,validator, authController);


export default router;
