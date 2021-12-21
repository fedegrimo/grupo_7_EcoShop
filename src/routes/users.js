// ************ Require's ************
const express = require('express');
const router = express.Router();
const {uploadProduct:upload,path} = require ('../middlewares/multerMiddleware');
const { check } = require('express-validator');
const {validationsLogin,validationsUserRegistration} = require ('../middlewares/validateRegisterMiddleware');
const {validations} = require ('../middlewares/validateRegisterMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersControlles');

/*** BACKEND USERS***/ 
router.get('/',usersController.users);
router.post('/',validationsLogin, usersController.usersLogin);

/*** CREATE ONE USER ***/ 
router.get('/create/', usersController.usersCreate); 
router.post('/create/', upload.single('fileImage'),validations,usersController.usersStore); 

/*** EDIT ONE USER ***/ 
router.get('/:id/edit',usersController.userEdit);
router.put('/:id', upload.single('fileImage'),validations,usersController.userUpdate); 


// /*** DELETE ONE USER***/ 
// router.delete('/:id', productsController.destroy);


module.exports = router;