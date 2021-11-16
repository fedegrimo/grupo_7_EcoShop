// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const { path } = require('../../server');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    const newFile = file.fieldname + '-' + Date.now();
    cb(null, newFile)
  }
})

const upload = multer({ storage: storage })

// ************ Controller Require ************
const productsController = require('../controllers/productsConstroller');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('fileImage'),productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.single('fileImage'),productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
