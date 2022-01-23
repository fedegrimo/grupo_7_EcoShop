const {checkSqlize} = require("../../config/connection");
const {create:CategorySyncDB}= require("../../models/Define/Category");
const {create:FeatureSyncDB} = require("../../models/Define/Feature");
const {create:ImageProductSyncDB} = require("../../models/Define/ImageProduct");
const {create:ProductSyncDB} = require("../../models/Define/Product");
const {create:ProductFeatureSyncDB} = require("../../models/Define/ProductFeature");
const {create:ProfileSyncDB} = require("../../models/Define/Profile");
const {create:UserSyncDB} = require("../../models/Define/User");
const {add} = require ("../../models/Define/Data");


const sw = false;

function initialDB (){
  checkSqlize();
  CategorySyncDB(sw);
  ProductSyncDB(sw);
  FeatureSyncDB(sw);
  ImageProductSyncDB(sw);
  ProductFeatureSyncDB(sw);
  ProfileSyncDB(sw);
  UserSyncDB(sw);
  add(sw);
}

module.exports = initialDB;
