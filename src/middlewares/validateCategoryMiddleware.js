const path= require('path');
const { check } = require("express-validator"); 

// ************ Validation Create / Update Product ************
const validations = [
    check("name").notEmpty().withMessage('Ingresar el concepto'),
    check("active_menu").notEmpty().withMessage("Seleccionar menu activo")
  ];

  module.exports = validations