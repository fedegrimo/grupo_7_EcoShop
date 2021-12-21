const fs = require ('fs');
const path = require('path');

const Product = {
    filename: path.join(__dirname, '../data/productsDataBase.json'),
    
    getData: () => {
        return JSON.parse(fs.readFileSync(Product.filename, 'utf-8'));
    },

    generateId: () => {
        let allProducts = Product.findAll();
        let lastProduct = allProducts.pop();
        if (lastProduct){
            return lastProduct.id + 1;
        }
        return 1;
    },
    
    findAll: () => {
        return Product.getData();
    },


    findByPk: (id) => {
        let allProducts = Product.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct.Id === id);
        return productFound;
    },

    findByFill:(field,text) => {
        let allProducts = Product.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
        return productFound;
    },

    create: (userData) => {
        let allProducts = Product.findAll();
        let newProduct ={
            id: Product.generateId(),
            ...userData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(Product.filename,JSON.stringify(allProducts,null,' '));
        return newProduct;
    },

    delete : (id) => {
        let allProducts = Product.findAll();
        let finalProduct = allProducts.filter(oneProduct => oneProduct.id !== id);
        fs.writeFileSync(Product.filename,JSON.stringify(finalProduct,null,' '),'utf-8');
        return true;
    }

}

module.exports = Product;
