const {sqlize,Sequelize:dataTypes} = require ('../../config/connection');

const alias = 'Category';

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
    active_menu: {
        type: dataTypes.BOOLEAN,
        allowNull: false
    }
};

const config = {
    tableName: "category",
    timestamps: false
}

 // Creación Tabla Category
 const Category = sqlize.define(alias, cols, config);

 // Relación Tabla Category
 Category.associate = function(models) {
    Category.hasMany(models.Product, { 
        as: "product",
        foreignKey: "category_id"
    })
}

 /**
 * 
 * @param {bool} switchTF
 * @example
 *  syncDB(true) => force to database / drop if exist the tables
 *  syncDB(false) => force to database / not drop if exist the tables
 */
const CategorySyncDB = async (switchTF) => {
    try {
      await Category.sync({ force: switchTF });
    } catch (err) {
        console.log("err syncDB: ", err);
    }
  };

module.exports = {
    create: CategorySyncDB,
    db: Category
};
