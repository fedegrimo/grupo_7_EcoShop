// ************ Require's ************
const express = require('express');
const router = express.Router();
const validations = require ('../../middlewares/validateFeatureMiddleware');


// ************ Controller Require ************
const featureController = require('../../controllers/main/featureController');

/*** GET Index ***/ 
router.get('/', featureController.index);

/*** GET LIST PRODUCTS ADMINISTRATION ***/
router.get('/list', featureController.list); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', featureController.create); 
router.post('/create/',validations,featureController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', featureController.edit); 
router.put('/:id',validations,featureController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', featureController.destroy); 

module.exports = router;
