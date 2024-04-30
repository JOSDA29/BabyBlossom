import db from '../config/db';
import Customer from '../Dto/customerDto';

class CustomerRepository {

    static async add(user: Customer){
        const sql = 'INSERT INTO customer (id_custo, name, last_name, address, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [user.identificacion, user.nombre, user.apellido, user.direccion, user.telefono, user.correo, user.contrasena];
        return db.execute(sql, values);
    }

    static async auth(correo: string, contrasena: string){
        const sql = 'SELECT password FROM customer WHERE email=?';
        const values = [correo];
        return db.execute(sql, values);
    }
}


export default CustomerRepository;