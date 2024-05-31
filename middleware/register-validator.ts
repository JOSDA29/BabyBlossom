
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validatorParamsR = [
    check('correo').isEmail().withMessage('Invalid email format'),
    check('contrasena').isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters'),
    check('nombre').isLength({ min: 1, max: 255 }).withMessage('Name must be between 1 and 255 characters'),
    check('telefono').isLength({ min: 1, max: 255 }).withMessage('Phone Number must be between 1 and 255 characters')
  ];
  
function validatorR(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

export { validatorParamsR, validatorR };