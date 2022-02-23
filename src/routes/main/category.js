// ************ Require's ************
const express = require('express');
const router = express.Router();
const validations = require ('../../middlewares/validateCategoryMiddleware');


// ************ Controller Require ************
const categoryController = require('../../controllers/main/categoryController');

/*** GET Index ***/ 
router.get('/', categoryController.index);

/*** GET LIST CATEGORY ALL ADMINISTRATION ***/
router.get('/list', categoryController.list); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', categoryController.create); 
router.post('/create/',validations,categoryController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', categoryController.edit); 
router.put('/:id',validations,categoryController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', categoryController.destroy); 


module.exports = router;
