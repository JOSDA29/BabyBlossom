const bcrypt = require("bcryptjs");
const db = require('../config/db');
import { Request, Response } from "express";
import CustomerRepository from '../repositories/customerRepositories';
import middlewareToken from '../middleware/middlewareToken'

let auth = async (req: Request, res: Response) => {
      try {
        const {correo, contrasena} = req.body;
        const result: any = await CustomerRepository.auth(correo, contrasena);
        
        if (result[0].length > 0) {
          const isPasswordValid = await bcrypt.compare(contrasena, result[0][0].password);

          if (isPasswordValid){
            const token = await middlewareToken.createToken(correo);

            return res.status(200).json({ 
              status: 'Successful authentication',
              accesToken : token
            });
          }
        }
        return res.status(401).json({ 
          status: 'Incorrect username or password'
        });

      } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ errorInfo: "Error in server.", error });
      }
}


export default auth;