require('dotenv').config();

const express = require('express');
const cors = require('cors');
const handlebars = require('express-handlebars');
const route = require('./routes');

const db = require('./config/db');
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;

db.connect();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(express.json());

//template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Listening to port: http://localhost:${port}`)
});