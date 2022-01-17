const {sqlize,Sequelize:dataTypes} = require ('../../config/connection');

const alias = 'ProductFeature';

const cols = {
    product_id: dataTypes.BIGINT(10),
    feature_id: dataTypes.BIGINT(10)
};

const config = {
    tableName: "product_feature",
    timestamps: false
}

// Creación Tabla Product Feature
const ProductFeature = sqlize.define(alias, cols, config);

// Relación Tabla Product Feature
ProductFeature.associate = function(models) {
    ProductFeature.hasMany(models.Product, { 
        as: "products",
        foreignKey: "product_id"
    })
}

 /**
 * 
 * @param {bool} switchTF
 * @example
 *  syncDB(true) => force to database / drop if exist the tables
 *  syncDB(false) => force to database / not drop if exist the tables
 */
const ProductFeatureSyncDB = async (switchTF) => {
    try {
      await ProductFeature.sync({ force: switchTF });
    } catch (err) {
        console.log("err syncDB: ", err);
    }
  };


module.exports = {
    create: ProductFeatureSyncDB,
    db: ProductFeature
};