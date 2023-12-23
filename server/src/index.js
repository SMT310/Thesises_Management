require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const handlebars = require('express-handlebars');
const route = require('./routes');

const db = require('./config/db');
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;

db.connect();

app.use(passport.initialize());
app.use(passport.session());

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

// Serve static files from the 'resources' directory
app.use(express.static(path.join(__dirname, 'resources')));

route(app);

app.listen(port, () => {
    console.log(`Listening to port: http://localhost:${port}`)
});