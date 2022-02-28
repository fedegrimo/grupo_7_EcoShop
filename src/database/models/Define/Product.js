const {sqlize,Sequelize:dataTypes} = require ('../../config/connection');
const {db:Category} = require ('./Category'); 


const alias = 'Product';

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
    price: {
        type: dataTypes.DECIMAL(8, 2).UNSIGNED,
        allowNull: false
    },
    offer: {
        type: dataTypes.DECIMAL(8, 2).UNSIGNED,
        allowNull: false
    },
    description: {
        type: dataTypes.TEXT(), 
        allowNull: false
    },
    picture: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    category_id: dataTypes.BIGINT(10),
    active: {
        type: dataTypes.BOOLEAN,
        allowNull: false
    }
};
const config = {
    tableName: "product",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
}

 // Creación Tabla Product
 const Product = sqlize.define(alias, cols, config);


 // Relación Tabla Category
 Product.belongsTo(Category,{  
    as: "category",
    foreignKey : "category_id"}
);
 /*Product.associate = function(models) {
     Product.belongsTo(models.Category, { 
         as: "category",
         foreignKey: "category_id"
     })
 }*/

 /**
 * 
 * @param {bool} switchTF
 * @example
 *  syncDB(true) => force to database / drop if exist the tables
 *  syncDB(false) => force to database / not drop if exist the tables
 */
const ProductSyncDB = async (switchTF) => {
    try {
      await Product.sync({ force: switchTF });
    } catch (err) {
        console.log("err syncDB: ", err);
    }
  };


module.exports = {
    create: ProductSyncDB,
    db: Product
};
