const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

const db = require('./config/mongoose-connection');

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');

require('dotenv').config(); 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}));

app.use(flash());


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

app.listen(3000, function () {
    console.log("Server running on http://localhost:3000");
});
