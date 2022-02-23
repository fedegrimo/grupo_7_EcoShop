// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../../controllers/api/usersController');

/*** BACKEND USERS***/ 
router.get('/',usersController.list);

/*** GET ONE PRODUCT ***/ 
router.get('/:id', usersController.detail);


module.exports = router;