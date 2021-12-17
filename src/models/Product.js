const fs = require ('fs');
const path = require('path');

const Product = {
    filename: path.join(__dirname, '../data/productsDataBase.json'),
    
    getData: () => {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },

    generateId: () => {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },
    
    findAll: () => {
        return this.getData();
    },


    findByPk: (id) => {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.Id === id);
        return userFound;
    },

    findByFill:(field,text) => {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
    },

    create: (userData) => {
        let allUsers = this.findAll();
        let newUser ={
            id: this.generateId(),
            ...userData
        }
        allUsers.push(userData);
        fs.writeFileSync(this.filename,JSON.stringify(allUsers,null,' '));
        return newUser;
    },

    delete : (id) => {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.filename,JSON.stringify(finalUsers,null,' '),'utf-8');
        return true;
    }

}

module.exports = Product;