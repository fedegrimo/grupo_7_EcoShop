const {sqlize,Sequelize:dataTypes} = require ('../../config/connection');

const alias = 'Feature';

const cols = {
    id: {
        type: dataTypes.BIGINT(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    name: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    parent: {
        type: dataTypes.INTEGER(),
        allowNull: false
    },
    active_menu: {
        type: dataTypes.BOOLEAN,
        allowNull: false
    }
};

const config = {
    tableName: "feature",
    timestamps: false
}

 // Creación Tabla Feature
 const Feature = sqlize.define(alias, cols, config);

 // Relación Tabla Feature
 Feature.associate = function(models) {
    Feature.hasMany(models.ProductFeature, { 
        as: "product_feature",
        foreignKey: "feature_id"
    })
}

 /**
 * 
 * @param {bool} switchTF
 * @example
 *  syncDB(true) => force to database / drop if exist the tables
 *  syncDB(false) => force to database / not drop if exist the tables
 */
const FeatureSyncDB = async (switchTF) => {
    try {
      await Feature.sync({ force: switchTF });
    } catch (err) {
        console.log("err syncDB: ", err);
    }
  };


module.exports = {
    create: FeatureSyncDB,
    db: Feature
};
