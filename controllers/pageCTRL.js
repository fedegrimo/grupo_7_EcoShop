const express = require('express');
const router = express.Router();

const pageCtrl = {
    "index" : router.get('/',(req,res) => {
        res.render('index');
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
    })

}

module.exports = pageCtrl;
