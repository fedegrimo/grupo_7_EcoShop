const { validationResult } = require ("express-validator");

const categoryDB = require ('../../database/models/Define/Category');

const { db } = categoryDB;

const active_menu = [{id: false, name: "NO"},
					 {id: true, name: "SI"} ];

const controller = {

	index: (req, res) => {
		res.render('backend');
	},
	// List administration product -trabajar
	list: async (req, res) => {
		if(req.cookies.login){
			let categoryAll =  await db.findAll();
			let cookies = req.cookies;
			res.render('category-list',{categoryAll, cookies});
		}else{
			res.redirect('/backend');
		}
		
	},

	// Create - Form to create -trabajar
	create: async (req, res) => {
		if(req.cookies.login){
			let cookies = req.cookies;
			res.render('category-create-form', {cookies,active_menu });

			
		}else{
			res.redirect('/backend');
		}
		
	},

	
	// Create -  Method to store
	store: async (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){

			res.render('category-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				active_menu
			});
		} else {
			await db.create({
						name : req.body.name,
						active_menu: req.body.active_menu
					});
			
			res.redirect('/products/category/list');
		}
		
	},

	// Update - Form to edit -TRABAJAR
	edit: async (req, res) => {
		if(req.cookies.login){
			const categoryToEdit = await db.findByPk(req.params.id);
			let cookies = req.cookies;
			res.render('category-edit-form',{categoryToEdit,active_menu,cookies});
		}else{
			res.redirect('/backend');
		}
	
	},
	// Update - Method to update
	update: async (req, res) => {

		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0){
			res.render('category-edit-form',{ 
				errors: resultValidation.mapped(),
				categoryToEdit: req.body,
				active_menu,
				users
			});
		} else {

			await db.update({
                name : req.body.name,
                active_menu: req.body.active_menu
            },
			{
				where: {id: req.params.id}
			}
			);
			res.redirect('/products/category/list');
		}
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		db.destroy({

			where: {id: req.params.id}

		});
		
		res.redirect('/products/category/list');
	}

};

module.exports = controller;