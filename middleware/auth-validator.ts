import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validatorParams = [
  check('correo').isEmail().withMessage('El email es incorrecto'),
  check('contrasena').isLength({ min: 8, max: 15 }).withMessage('La contraseña es muy corta')
];  

function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

export {
  validatorParams,
  validator
};
