// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {uploadAvatar:upload,path} = require ('../middlewares/multerMiddleware');
const {validationsLogin,validationsUserRegistration} = require ('../middlewares/validateRegisterMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersControlles');

/*** BACKEND USERS***/ 
router.get('/',usersController.list);

/*** CREATE ONE USER ***/ 
router.get('/create/', usersController.create); 
router.post('/create/', upload.single('fileImage'),validationsUserRegistration,usersController.store); 

/*** EDIT ONE USER ***/ 
router.get('/:id/edit',usersController.edit);
router.put('/:id', upload.single('fileImage'),validationsUserRegistration,usersController.update); 


// /*** DELETE ONE USER***/ 
router.delete('/:id', usersController.destroy);


module.exports = router;