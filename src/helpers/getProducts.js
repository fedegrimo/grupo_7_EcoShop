const fs = require('fs');


const getProducts = async () => {

    try {
        const products =  await fs.promises.readFile('./data/productos.json','utf-8', ( err, data ) => products);
        return JSON.parse(products);
    } catch (error) {
        console.log(error);
    }

} 

module.exports = {
    getProducts,
}