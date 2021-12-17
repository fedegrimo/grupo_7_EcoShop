// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {validationsLogin,validationsUserRegistration} = require ('../middlewares/validateRegisterMiddleware');

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/*** GET HOME ***/ 
router.get('/', mainController.index); 

/*** GET SEARCH PRODUCTS ***/ 
router.get('/search', mainController.search); 

/*** GET LOGIN USER ***/ 
router.get('/login', mainController.login);

/*** GET LOGIN VALIDATION ***/ 
router.post('/login',validationsLogin, mainController.loginValidation);

/*** GET REGISTER USER ***/ 
router.get('/register', mainController.register); 
router.post('/register', validationsUserRegistration, mainController.store); 

/*** GET CART ***/ 
router.get('/cart', mainController.cart); 

module.exports = router;