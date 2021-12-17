// ************ Require's ************
const express = require('express');
const router = express.Router();
const {uploadProduct:upload,path} = require ('../middlewares/multerMiddleware');
const validations = require ('../middlewares/validateRegisterMiddleware');


// ************ Controller Require ************
const productsController = require('../controllers/productsConstroller');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** GET LIST PRODUCTS ADMINISTRATION ***/
router.get('/list', productsController.list); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/create/', upload.single('fileImage'),validations,productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.single('fileImage'),validations,productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
