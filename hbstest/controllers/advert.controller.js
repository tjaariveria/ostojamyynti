import db from '../app.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const listAdverts = async (req, res, next) => {
    try {
        db.query("SELECT * FROM ilmoitukset", async (error, results) => {
            req.list = results;
            next();
        });
    } catch (error) {
        console.log(error);
    }
};

const listUserAdverts = async (req, res, next) => {
    try {
        const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
        );
        db.query(
            "SELECT * FROM ilmoitukset WHERE ilmoittaja_id = ?",
            [decoded.id],
            async (error, results) => {
                req.list = results;
                next();
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export default listAdverts;
export { listUserAdverts };