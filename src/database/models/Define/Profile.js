const {sqlize,Sequelize:dataTypes} = require ('../../config/connection');

const alias = 'Profile';

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
    tableName: "profile",
    timestamps: false
}

 // Creación Tabla Profile
 const Profile = sqlize.define(alias, cols, config);

 // Relación Tabla Profile
 Profile.associate = function(models) {
    Profile.hasMany(models.User, { 
        as: "user",
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
const ProfileSyncDB = async (switchTF) => {
    try {
      await Profile.sync({ force: switchTF });
    } catch (err) {
        console.log("err syncDB: ", err);
    }
  };

module.exports = {
    create: ProfileSyncDB,
    db: Profile
};