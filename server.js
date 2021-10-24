const express = require("express");
const server = express();
const path = require("path");
server.use("/public",express.static("public"));

const HOME_PAGE = "views/home.html";
const PRODUCT_PAGE = "views/productos.html";
const CONTACT_PAGE = "views/contacto.html";
const LOGIN_PAGE = "views/login.html";
const SEARCH_PAGE = "views/buscar.html";
const US_PAGE = "views/nosotros.html";
const CART_PAGE = "views/carrito.html";
const REGISTER_PAGE = "views/registro.html";
const PORT = 5000;

server.get("/mensaje",(req,res)=>{
    res.send("Mensaje desde js");
});



server.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,HOME_PAGE));
});

server.get("/cart",(req,res)=>{
    res.sendFile(path.join(__dirname,CART_PAGE));
});
server.get("/registro",(req,res)=>{
    res.sendFile(path.join(__dirname,REGISTER_PAGE));
});

server.get("/nosotros",(req,res)=>{
    res.sendFile(path.join(__dirname,US_PAGE));
});

server.get("/contacto",(req,res)=>{
    res.sendFile(path.join(__dirname,CONTACT_PAGE));
});

server.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,LOGIN_PAGE));
});

server.get("/productos",(req,res)=>{
    res.sendFile(path.join(__dirname,PRODUCT_PAGE));
});

server.get("/buscar",(req,res)=>{
    res.sendFile(path.join(__dirname,SEARCH_PAGE));
});


server.listen(PORT,()=>{
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
