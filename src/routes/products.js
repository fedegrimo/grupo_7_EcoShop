// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const { check } = require("express-validator"); 
const { path } = require('../../server');

// ************ Path Image & Generate Name Image ************
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    const newFile = file.fieldname + '-' + Date.now();
    cb(null, newFile)
  }
});

const upload = multer({ storage: storage });

// ************ Validation Form ************
const validations = [
  check("name").notEmpty().withMessage('Ingresar el nombre del producto'),
  check("price").notEmpty().withMessage('Ingresar precio').bail().isFloat().withMessage("Debes ingresar solamente valores numéricos"),
  check("category").notEmpty().withMessage("Seleccionar categoría"),
  check("fileImage").custom((value, {req}) => {
    let file = req.file;
    let acceptExtension = ['.jpg','.gif','.png','.svg'];
    
    if (!file){
      throw new Error ("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      
      if(!acceptExtension.includes(fileExtension)){
        throw new Error (`Las extension permitidas son ${acceptExtension.join(', ')}`);
      }
    }
    
    return true;
  }),
]

// ************ Controller Require ************
const productsController = require('../controllers/productsConstroller');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** GET LIST PRODUCTS ADMINISTRATION ***/
router.get('/list', productsController.list); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('fileImage'),validations,productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.single('fileImage'),productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
