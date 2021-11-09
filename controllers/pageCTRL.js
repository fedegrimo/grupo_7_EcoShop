const express = require('express');
const router = express.Router();

const { getProducts } = require('../src/helpers/getProducts');
const { getRecomendaciones } = require('../src/helpers/getRecomendaciones');

const pageCtrl = {
    "index" : router.get('/', async (req,res) => {
        
        const products = await getProducts();
        const item = await getRecomendaciones();
        res.render('index', { products, item });
    }),
    "cart" : router.get('/cart',(req,res) => {
        res.render('productCart');
    }),
    "register" : router.get('/register',(req,res) => {
        res.render('register');
    }),
    "login" : router.get('/login',(req,res) => {
        res.render('login');
    }),
    "product" : router.get('/product',(req,res) => {
        res.render('productDetail');
    }),
    "agregarProducto" : router.get('/agregarProducto',(req,res) => {
        res.render('uploadProducts');
    }),
    "editorProductos" : router.get('/editorProductos',(req,res) => {
        res.render('editorProductos');
    })
}

module.exports = pageCtrl;
