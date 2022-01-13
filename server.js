// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const path = require("path");
const express = require("express");
const logger = require('morgan');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require('express-session');
// ************ express() - (don't touch) ************
const server = express();

const PORT = process.env.PORT || 3000;


// ************ Middlewares - (don't touch) ************
server.use(express.static(path.join(__dirname, 'public')));  // Necesario para los archivos estáticos en el folder /public
server.use(express.urlencoded({ extended: false }));
server.use(logger('dev'));
server.use(express.json());
server.use(cookieParser());
server.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

server.use(session({
    secret:'Secreto',
    resave:true,
    saveUninitialized:true
}));

// ************ Template Engine - (don't touch) ************
server.set("view engine", "ejs");
server.set("views", path.resolve(__dirname, "views"));

// ************ FOLDERS LIBRARY ************
server.use('/css',express.static(path.resolve(__dirname,'public/css')));
server.use('/img',express.static(path.resolve(__dirname,'public/img')));
server.use('/js',express.static(path.resolve(__dirname,'public/js')));

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************

const mainRouter = require('./src/routes/main'); // Rutas main
const productsRouter = require('./src/routes/products'); // Rutas /products
const backendRouter = require('./src/routes/backend'); // Rutas /backend
const usersRouter = require('./src/routes/users'); // Rutas /backend

server.use('/', mainRouter);
server.use('/products', productsRouter);
server.use('/backend', backendRouter);
server.use('/users',usersRouter);

//sequelize config
const db = require("./src/database/models/Define/");

db();

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
server.use((req, res, next) => next(createError(404)));

server.listen(PORT,()=>{
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
