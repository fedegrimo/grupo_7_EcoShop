const { validationResult } = require ("express-validator");

const categoryDB = require ('../database/models/Define/Category');

const { db } = categoryDB;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	
	// List administration product -trabajar
	list: async (req, res) => {
		if(req.cookies.login){
			let products =  await db.findAll();
			let cookies = req.cookies;
			res.render('category-list',{products, cookies});
		}else{
			res.redirect('/backend');
		}
		
	},

	// Create - Form to create -trabajar
	create: async (req, res) => {
		if(req.cookies.login){
			let categorias = await categoryDB.db.findAll();
			let cookies = req.cookies;
			res.render('category-create-form', {categorias, cookies });

			
		}else{
			res.redirect('/backend');
		}
		
	},

	
	// Create -  Method to store
	store: async (req, res) => {
		const resultValidation = validationResult(req);
		const fileImage = req.file.filename;
		if (resultValidation.errors.length > 0){

			res.render('category-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				categorias,
				users
			});
		} else {
			await db.create({
						name : req.body.title,
						price: req.body.price,
						offer: req.body.discount,
						description: req.body.description,
						category_id: req.body.category,
						picture : fileImage,
						active: false
					});
			
			res.redirect('/category/list');
		}
		
	},

	// Update - Form to edit -TRABAJAR
	edit: async (req, res) => {
		if(req.cookies.login){

			const categorias = await categoryDB.db.findAll();
			const productToEdit = await db.findByPk(req.params.id);
			let cookies = req.cookies;
			res.render('category-edit-form',{productToEdit,categorias,cookies});
		}else{
			res.redirect('/backend');
		}
	
	},
	// Update - Method to update
	update: async (req, res) => {

		const resultValidation = validationResult(req);
		const fileImage = req.file;

		if (resultValidation.errors.length > 0){
			res.render('category-edit-form',{ 
				errors: resultValidation.mapped(),
				productToEdit: req.body,
				users
			});
		} else {
			const filename = (fileImage) ? fileImage.filename : req.body.picture;

			await db.update({
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
			res.redirect('/category/list');
		}
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		db.destroy({

			where: {id: req.params.id}

		});
		
		res.redirect('/category/list');
	}

};

module.exports = controller;