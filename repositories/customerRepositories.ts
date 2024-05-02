import db from '../config/db';
import Customer from '../Dto/customerDto';
import Auth from '../Dto/customerDto';

const bcrypt = require("bcryptjs");

class CustomerRepository {

    static async add(user: Customer){
        const sql = 'INSERT INTO customer (id_custo, name, last_name, address, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [user.identificacion, user.nombre, user.apellido, user.direccion, user.telefono, user.correo, user.contrasena];
        return db.execute(sql, values);
    }

    static async login(auth: Auth){
        const sql = 'SELECT password FROM customer WHERE email=?';
        const values = [auth.correo];
        const result: any = await db.execute(sql, values);
        if (result[0].length > 0) {
            const isPasswordValid = await bcrypt.compare(auth.contrasena, result[0][0].password);
  
            if (isPasswordValid){
              return {logged: true, status: "Successful authentication"}
            }
            return {logged: false, status: "Invalid username or password" };
        }
        return {logged: false, status: "Invalid username or password" };
    }
}
export default CustomerRepository;