const fs = require('fs');
const path = require('path');
const bcrypt = require ('bcryptjs');
const ImageProduct = require('./ImageProduct');
const productsFilePath = path.join(__dirname, '../../../data/productsDataBase.json');
const insertProduct = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productDB = require('../Define/Product');
const categoryDB = require('../Define/Category');
const userDB = require ('../Define/User');
const profileDB = require ('../Define/Profile');


const insertData = async (switchTF) => {
    try {
        
            /* Add Category Ofertas */
            await categoryDB.db.create({
                name: "Home",
                active_menu : true
            });

            /* Add Category Ofertas */
            await categoryDB.db.create({
                name: "Ofertas",
                active_menu : true
            });

            /* Perfiles BackEnd */
            await profileDB.db.create({
                name : "administrador",
                active_menu:true
            });

            await profileDB.db.create({
                name : "cliente",
                active_menu:true
            });

            /* Usuario BackEnd */
            await userDB.db.create({
                firstname : "Admin",
                lastname: "Echo",
                email: "admin@admin.com",
                password: bcrypt.hashSync("administrador",10),
                images: "profile.png",
                profile_id : "1"
            });

            /*Insert Product  */
            insertProduct.forEach( async element => {
                await productDB.db.create({
                    name: element.name,
                    price: element.price,
                    offer: element.discount,
                    description: element.description,
                    picture: element.picture,
                    category_id: 1,
                    active: true
                });
                
            });
        
      
    } catch (err) {
        console.log("err syncDB: ", err);
    }
  };


module.exports = {
    add: insertData
}

 


