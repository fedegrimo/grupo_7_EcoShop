// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// ************ Validation Form Login************
const validationsLogin = [
    check("email").notEmpty().withMessage('Ingresar email'),
    check("password").notEmpty().withMessage('Ingresar contraseña')
  ]

const validationsUserRegistration = [
    check("nombre").notEmpty().withMessage('Ingresar nombre'),
    check("apellido").notEmpty().withMessage('Ingresar apellido'),
    check("email").notEmpty().withMessage('Ingresar email').bail().
    isEmail().withMessage("Email inválido"),
    check("password").notEmpty().withMessage('Ingresar constraseña').bail().
    isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres.")
  ]

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