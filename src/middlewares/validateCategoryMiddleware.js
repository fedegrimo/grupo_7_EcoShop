const path= require('path');
const { check } = require("express-validator"); 

// ************ Validation Create / Update Product ************
const validations = [
    check("title").notEmpty().withMessage('Ingresar el nombre del producto'),
    check("price").notEmpty().withMessage('Ingresar precio').bail().isFloat().withMessage("Debes ingresar solamente valores numéricos"),
    check("category").notEmpty().withMessage("Seleccionar categoría")
  ];

  module.exports = validations