const {sqlize,Sequelize:dataTypes} = require ('../../config/connection');

const alias = 'users';

const cols = {
    id: {
        type: dataTypes.BIGINT(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    firstname: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    lastname: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    images: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    profile_id: dataTypes.BIGINT(10)
};
const config = {
    tableName: "users",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
}

 // Creación Tabla User
 const User = sqlize.define(alias, cols, config);

 // Relación Tabla User
 User.associate = function(models) {
    User.belongsTo(models.Profile, { 
         as: "profile",
         foreignKey: "profile_id"
     })
 }

 /**
 * 
 * @param {bool} switchTF
 * @example
 *  syncDB(true) => force to database / drop if exist the tables
 *  syncDB(false) => force to database / not drop if exist the tables
 */
const UserSyncDB = async (switchTF) => {
    try {
      await User.sync({ force: switchTF });
    } catch (err) {
        console.log("err syncDB: ", err);
    }
  };


module.exports = {
    create: UserSyncDB,
    db: User
};
