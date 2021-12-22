const fs = require ('fs');
const path = require('path');

const User = {
    filename: path.join(__dirname, '../data/usersDataBase.json'),
    
    getData: () => {
        return JSON.parse(fs.readFileSync(User.filename, 'utf-8'));
    },

    generateId: () => {
        let allUsers = User.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
            return parseINT(lastUser.id) + 1;
        }
        return 1;
    },
    
    findAll: () => {
        return User.getData();
    },


    findByPk: (id) => {
        let allUsers = User.findAll();
        let userFound = allUsers.find(oneUser => oneUser.Id === id);
        return userFound;
    },

    findByFill:(field,text) => {
        let allUsers = User.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: (userData) => {
        let allUsers = User.findAll();
        let newUser ={
            id: User.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(User.filename,JSON.stringify(allUsers,null,' '));
        return newUser;
    },

    delete : (id) => {
        let allUsers = User.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(User.filename,JSON.stringify(finalUsers,null,' '),'utf-8');
        return true;
    }

}

module.exports = User;
