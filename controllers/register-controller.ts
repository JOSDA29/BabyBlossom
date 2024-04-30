import bcrypt from 'bcryptjs';
import CustomerRepository from '../repositories/customerRepositories';
import Customer from '../Dto/customerDto';
import { Request, Response } from "express";

let register = async (req: Request, res: Response) => {
  try {
    const {
      identificacion,
      nombre,
      apellido,
      direccion,
      telefono,
      correo,
      contrasena,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);
    const result = await CustomerRepository.add(new Customer(identificacion, nombre, apellido, direccion, telefono,correo, hashedPassword));
    
    return res.status(201).send(
      { status: 'register ok', 
        password_hasheado: hashedPassword
      }
    );

  } catch (error: any) {
    if (error && error.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ errorInfo: "Data already exist." });
    }
    return res.status(500).send({ errorInfo: "Error server.", error });
  }
}



export default register;