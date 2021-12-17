const path= require('path');
const { check } = require("express-validator"); 

// ************ Validation Create / Update Product ************
const validations = [
    check("title").notEmpty().withMessage('Ingresar el nombre del producto'),
    check("price").notEmpty().withMessage('Ingresar precio').bail().isFloat().withMessage("Debes ingresar solamente valores numéricos"),
    check("category").notEmpty().withMessage("Seleccionar categoría"),
    check("fileImage").custom((value, {req}) => {
      let file = req.file;
      let acceptExtension = ['.jpg','.gif','.png','.webp'];
  
      if (!req.body.picture){
        if (!file){
          throw new Error ("Tienes que subir una imagen");
        } else {
          let fileExtension = path.extname(file.originalname);
          
          if(!acceptExtension.includes(fileExtension)){
            throw new Error (`Las extension permitidas son ${acceptExtension.join(', ')}`);
          }
        }
      }
      
      
      return true;
    })
  ];

  module.exports = validations;