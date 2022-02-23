// ************ Require's ************
const express = require('express');
const router = express.Router();
const {uploadProduct:upload,path} = require ('../../middlewares/multerMiddleware');
const {validations} = require ('../../middlewares/validateRegisterMiddleware');


// ************ Controller Require ************
const productsController = require('../../controllers/api/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.list); 

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail);

router.get('/category/:id',productsController.category);

module.exports = router;
