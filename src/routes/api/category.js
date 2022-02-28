// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const categoryController = require('../../controllers/api/categoryController');

/*** BACKEND USERS***/ 
router.get('/',categoryController.list);

/*** GET ONE PRODUCT ***/ 
router.get('/:id', categoryController.detail);


module.exports = router;