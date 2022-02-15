const path= require('path');
const { check } = require("express-validator"); 

// ************ Validation Create / Update Product ************
const validations = [
    check("name").notEmpty().withMessage('Ingresar concepto'),
    check("parent").notEmpty().withMessage("Seleccionar padre"),
    check("active_menu").notEmpty().withMessage("Seleccionar activo")
  ];

  module.exports = validations