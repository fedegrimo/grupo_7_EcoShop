const path = require("path");
const express = require("express");
const server = express();
const pageCTRL = require('./controllers/pageCTRL');
const PORT = process.env.PORT || 3000;

//Set Template Engine
server.set("views", path.resolve(__dirname, "views"));
server.set("view engine", "ejs");

//Static Files
server.use('/css',express.static(path.resolve(__dirname,'public/css')));
server.use('/img',express.static(path.resolve(__dirname,'public/img')));
server.use('/js',express.static(path.resolve(__dirname,'public/js')));

//Routes Files
server.get("/",pageCTRL.index);
server.get("/cart",pageCTRL.cart);
server.get("/register",pageCTRL.register);
server.get("/login",pageCTRL.login);
server.get("/product",pageCTRL.product);


server.listen(PORT,()=>{
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
