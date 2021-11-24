import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set("views", "./views");

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000);