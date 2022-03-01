const { validationResult } = require ("express-validator");

const productDB = require ('../../database/models/Define/Product');
const categoryDB = require ('../../database/models/Define/Category');

const { db } = productDB;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: async (req, res) => {
		let products =  await db.findAll();
		let cookies = req.cookies;
		res.render('products',{products,login: req.cookies.email,cookies});
	},
	// List administration product -trabajar
	list: async (req, res) => {
		if(req.cookies.login){
			let products =  await db.findAll();
			let cookies = req.cookies;
			res.render('backendIndex',{products, cookies});
		}else{
			res.redirect('/backend');
		}
		
	},
	// Detail - Detail from one product
	detail: async (req, res) => {
		let id = req.params.id;
		let rowProduct =  await db.findByPk(req.params.id);
		let products =  await productDB.db.findAll({
			where:{
				category_id: 2,
				active: 1
			}
		});
		res.render('productDetail',{ rowProduct, products, toThousand,login: req.cookies.email})
	},

	// Create - Form to create -trabajar
	create: async (req, res) => {
		if(req.cookies.login){
			let categorias = await categoryDB.db.findAll({
				where:{
					active_menu: 1
				}
			});
			let cookies = req.cookies;
			res.render('product-create-form', {categorias, cookies });

			
		}else{
			res.redirect('/backend');
		}
		
	},

    // Add - Cart
	cart: (req, res) => {
		res.render('productCart',{category});
	},
	
	// Create -  Method to store
	store: async (req, res) => {
		const resultValidation = validationResult(req);
		const fileImage = req.file.filename;
		if (resultValidation.errors.length > 0){

			res.render('product-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				categorias,
				users
			});
		} else {
			await productDB.db.create({
						name : req.body.title,
						price: req.body.price,
						offer: req.body.discount,
						description: req.body.description,
						category_id: req.body.category,
						picture : fileImage,
						active: false
					});
			
			res.redirect('/products/list');
		}
		
	},

	// Update - Form to edit -TRABAJAR
	edit: async (req, res) => {
		if(req.cookies.login){

			const categorias = await categoryDB.db.findAll({
				where:{
					active_menu: 1
				}
			});
			const productToEdit = await db.findByPk(req.params.id);
			let cookies = req.cookies;
			res.render('product-edit-form',{productToEdit,categorias,cookies});
		}else{
			res.redirect('/backend');
		}
	
	},
	// Update - Method to update
	update: async (req, res) => {

		const resultValidation = validationResult(req);
		const fileImage = req.file;

		if (resultValidation.errors.length > 0){
			res.render('product-edit-form',{ 
				errors: resultValidation.mapped(),
				productToEdit: req.body,
				users
			});
		} else {
			const filename = (fileImage) ? fileImage.filename : req.body.picture;

			await productDB.db.update({
                name : req.body.title,
                price: req.body.price,
                offer: req.body.discount,
				description: req.body.description,
				category_id: req.body.category,
				picture : filename,
				active: false
            },
			{
				where: {id: req.params.id}
			}
			);
			res.redirect('/products/list');
		}
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		productDB.db.destroy({

			where: {id: req.params.id}

		});
		
		res.redirect('/products/list');
	}

};

module.exports = controller;