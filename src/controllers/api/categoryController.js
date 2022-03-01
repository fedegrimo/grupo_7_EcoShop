const {db } = require ('../../database/models/Define/Category');
const {db: dbProduct } = require ('../../database/models/Define/Product');

const host = 'http://localhost:3000/img/products/';

const controller = {
	list: async (req, res) => {
        let categorys =  await db.findAll();

        let apiCategory = categorys.map(category =>{
            return({
            id: category.id, 
            name: category.name,
            active: category.active_menu
            });
        });

        let respuesta = {
            meta: {
                status : 200,
                total: categorys.length,
                url: '/api/category'
            },
            data: apiCategory
        }
        res.json(respuesta);
},
     detail: async (req, res) => {
		let id = req.params.id;
		let products =  await dbProduct.findAll({
            where: {
              category_id: id
            }
          });
          

          let apiProducts = products.map(product =>{
            return({
                id: product.id, 
                name: product.name,
                description: product.description,
                category_id: product.category_id,
                picture: host + product.picture,
                price: product.price,
                offer: product.offer
            });
        });

		let respuesta = {
            meta: {
                status : 200,
                total: products.length,
                url: '/api/category/:id'
            },
            data: apiProducts
        }
        res.json(respuesta);
	}
};

module.exports = controller;
