const express = require("express");
const server = express();
const path = require("path");
server.use("/public",express.static("public"));

const HOME_PAGE = "views/index.html";
const PRODUCT_DETAIL = "views/productDetail.html";
const LOGIN_PAGE = "views/login.html";
const PRODUCT_CART = "views/productCart.html";
const REGISTER_PAGE = "views/register.html";
const PORT = process.env.PORT || 5000;

server.get("/mensaje",(req,res)=>{
    res.send("Mensaje desde js");
});


server.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,HOME_PAGE));
});

server.get("/cart",(req,res)=>{
    res.sendFile(path.join(__dirname,PRODUCT_CART));
});
server.get("/registro",(req,res)=>{
    res.sendFile(path.join(__dirname,REGISTER_PAGE));
});


server.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,LOGIN_PAGE));
});

server.get("/productos",(req,res)=>{
    res.sendFile(path.join(__dirname,PRODUCT_DETAIL));
});




server.listen(PORT,()=>{
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
