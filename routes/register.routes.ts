import express from "express";
import registerController from '../controllers/register-controller';
import { validatorParamsR, validatorR } from "../middleware/register-validator";
const router = express.Router();


router.post('/',validatorParamsR,validatorR,registerController);


export default router;