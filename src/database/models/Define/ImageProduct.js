const {sqlize,Sequelize:dataTypes} = require ('../../config/connection');

const alias = 'imageProduct';

const cols = {
    id: {
        type: dataTypes.BIGINT(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    fileName: {
        type: dataTypes.STRING(255),
        allowNull: false
    },
    product_id: dataTypes.BIGINT(10)
};

const config = {
    timestamps: false
}

// Creación Tabla Image
const Images = sqlize.define(alias, cols, config);

// Relación Tabla Image
Images.associate = function(models) {
    Images.hasMany(models.Product, { 
        as: "products",
        foreignKey: "id"
    })
}

 /**
 * 
 * @param {bool} switchTF
 * @example
 *  syncDB(true) => force to database / drop if exist the tables
 *  syncDB(false) => force to database / not drop if exist the tables
 */
const ImageProductSyncDB = async (switchTF) => {
    try {
      await Images.sync({ force: switchTF });
    } catch (err) {
        console.log("err syncDB: ", err);
    }
  };


module.exports = ImageProductSyncDB;