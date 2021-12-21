// ************ Require's ************
const express = require('express');
const router = express.Router();
const {uploadProduct:upload,path} = require ('../middlewares/multerMiddleware');
const { check } = require('express-validator');
const {validationsLogin,validationsUserRegistration} = require ('../middlewares/validateRegisterMiddleware');
const {validations} = require ('../middlewares/validateRegisterMiddleware');

// ************ Controller Require ************
const backendController = require('../controllers/backendController');

/*** BACKEND ADMIN LOGIN ***/ 
router.get('/', backendController.backend);
router.post('/',validationsLogin, backendController.backendLogin);
router.post('/logout', backendController.logout)

module.exports = router;