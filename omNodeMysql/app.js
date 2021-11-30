import express, { urlencoded, json } from 'express';
import { create } from 'express-handlebars';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import pages from './routes/page.routes';
import auth from './routes/auth.routes';


dotenv.config();

const app = express();
const hbs = create({ extname: '.hbs'});

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



// Parse URL-encoded bodies (as sent by HTML forms)
app.use(urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API client)
app.use(json());

app.use(cookieParser());

app.use(express.static('public'));

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

// Require routes
app.use('/', pages);
app.use('/register', express('./routes/register.routes'));
app.use('/auth', auth); 

app.listen(3030, () => {
    console.log("Server listening port 3030");
    db.connect( (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Connected to database");
        }
    });
});

export default db;