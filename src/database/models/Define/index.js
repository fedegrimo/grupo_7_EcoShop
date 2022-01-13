const {checkSqlize} = require("../../config/connection");
const CategorySyncDB = require("../../models/Define/Category");
const FeatureSyncDB = require("../../models/Define/Feature");
const ImageProductSyncDB = require("../../models/Define/ImageProduct");
const ProductSyncDB = require("../../models/Define/Product");
const ProductFeatureSyncDB = require("../../models/Define/ProductFeature");
const ProfileSyncDB = require("../../models/Define/Profile");
const UserSyncDB = require("../../models/Define/User");


const sw = false;

function initialDB (){
  checkSqlize();
  ProductSyncDB(sw);
  FeatureSyncDB(sw);
  CategorySyncDB(sw);
  ImageProductSyncDB(sw);
  ProductFeatureSyncDB(sw);
  ProfileSyncDB(sw);
  UserSyncDB(sw);
}

module.exports = initialDB;
