const fs = require ('fs');
const path = require('path');

const Product = {
    filename: path.join(__dirname, '../data/productsDataBase.json'),
    
    getData: () => {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },

    generateId: () => {
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if (lastProduct){
            return lastProduct.id + 1;
        }
        return 1;
    },
    
    findAll: () => {
        return this.getData();
    },


    findByPk: (id) => {
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct.Id === id);
        return productFound;
    },

    findByFill:(field,text) => {
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
        return productFound;
    },

    create: (userData) => {
        let allProducts = this.findAll();
        let newProduct ={
            id: this.generateId(),
            ...userData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.filename,JSON.stringify(allProducts,null,' '));
        return newProduct;
    },

    delete : (id) => {
        let allProducts = this.findAll();
        let finalProduct = allProducts.filter(oneProduct => oneProduct.id !== id);
        fs.writeFileSync(this.filename,JSON.stringify(finalProduct,null,' '),'utf-8');
        return true;
    }

}

module.exports = Product;
