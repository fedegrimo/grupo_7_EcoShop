// ************ Require's ************
const express = require('express');
const router = express.Router();
const validations = require ('../middlewares/validateCategoryMiddleware');


// ************ Controller Require ************
const categoryController = require('../controllers/categoryController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', categoryController.index); 

/*** GET LIST PRODUCTS ADMINISTRATION ***/
router.get('/list', categoryController.list); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', categoryController.create); 
router.post('/create/',validations,categoryController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', categoryController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', categoryController.edit); 
router.put('/:id',validations,categoryController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', categoryController.destroy); 


module.exports = router;
