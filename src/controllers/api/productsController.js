const productDB = require ('../../database/models/Define/Product');
const { db } = productDB;
const host = 'http://localhost:3000/img/products/';


const controller = {
	// List administration product -trabajar
	list: async (req, res) => {
			let products =  await db.findAll({include: ['category']});

            let apiProducts = products.map(product =>{
                return({
                id: product.id, 
                name: product.name,
                description: product.description,
                category_id: product.category_id,
                category_name:product.category.name,
                picture: host + product.picture
                });
            });

            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: '/api/products'
                },
                data: apiProducts
            }
			res.json(respuesta);
	},
	// Detail - Detail from one product
	detail: async (req, res) => {
		let id = req.params.id;
		let rowProduct =  await db.findByPk(req.params.id);
		let respuesta = {
            meta: {
                status : 200,
                total: rowProduct.length,
                url: '/api/products/:id'
            },
            data: {
                id: rowProduct.id, 
                name: rowProduct.name,
                description: rowProduct.description,
                category_id: rowProduct.category_id,
                picture: host + rowProduct.picture
            }
        }
        res.json(respuesta);
	},
    category: async (req, res) => {
		let id = req.params.id;
		let products =  await productDB.db.findAll({
			where:{
				category_id: id,
				active: 1
			}
		});
        let apiProducts = products.map(product =>{
            return({
            id: product.id, 
            name: product.name,
            description: product.description,
            category_id: product.category_id,
            picture: host + product.picture
            });
        });
		let respuesta = {
            meta: {
                status : 200,
                total: products.length,
                url: '/api/products/category/:id'
            },
            data: apiProducts
        }
        res.json(respuesta);
	}
};

module.exports = controller;