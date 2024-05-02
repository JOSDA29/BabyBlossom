const bcrypt = require("bcryptjs");
const db = require('../config/db');
import { Request, Response } from "express";
import CustomerRepository from '../repositories/customerRepositories';
import middlewareToken from '../middleware/middlewareToken'
import Auth from "../Dto/authDto";
import Customer from "../Dto/customerDto";

let auth = async (req: Request, res: Response) => {
      try {
        const {correo, contrasena} = req.body;
        const auth = await CustomerRepository.login(new Customer('', '', '', '', '', correo, contrasena));

        if (auth.logged) {
          const token = await middlewareToken.createToken(correo);
          return res.status(200).json({ 
            status: 'Successful authentication',
            accesToken : token
          });
        }
        return res.status(401).json({
          status: auth.status
        });

      } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ errorInfo: "Error in server.", error });
      }
}


export default auth;