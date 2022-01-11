const {checkSqlize} = require("../config/connection");
const ProductSyncDB = require("../models/Product");
const CategorySyncDB = require("../models/Category");
const ImageProductSyncDB = require("../models/ImageProduct");
const sw = false;

function initialDB (){
  checkSqlize();
  ProductSyncDB(sw);
  CategorySyncDB(sw);
  ImageProductSyncDB(sw);
}

module.exports = initialDB;
