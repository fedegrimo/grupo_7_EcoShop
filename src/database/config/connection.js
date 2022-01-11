const { Sequelize} = require("sequelize");
const KeyDB = require("./keyDbConfig");


const sqlize = new Sequelize(KeyDB.DATABASE, KeyDB.USER_NAME, KeyDB.PASSWORD, {
  host: KeyDB.HOST,
  dialect: KeyDB.DIALECT
});




const checkSqlize = async () => {
  try {
    await sqlize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


/**
 * 
 * @param {bool} switchTF
 * @example
 *  syncDB(true) => force to database / drop if exist the tables
 *  syncDB(false) => force to database / not drop if exist the tables
 */
const SyncDB = async (switchTF) => {
  try {
    await Users.sync({ force: switchTF });
  } catch (err) {
      console.log("err syncDB: ", err);
  }
};

 

module.exports = {
  sqlize,
  Sequelize,
  checkSqlize,
  SyncDB
  };


