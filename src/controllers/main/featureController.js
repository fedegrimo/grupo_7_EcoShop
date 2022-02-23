const { validationResult } = require ("express-validator");

const featureDB = require ('../../database/models/Define/Feature');

const { db } = featureDB;

const controller = {
	index:  (req, res) => {
		res.render('backend');
	},
	// List administration product -trabajar
	list: async (req, res) => {
		if(req.cookies.login){
			let features =  await db.findAll();
			let cookies = req.cookies;
			res.render('feature-list',{features, cookies});
		}else{
			res.redirect('/backend');
		}
		
	},

	// Create - Form to create -trabajar
	create: async (req, res) => {
		if(req.cookies.login){
			let cookies = req.cookies;
			res.render('feature-create-form', {cookies });

			
		}else{
			res.redirect('/backend');
		}
		
	},

	
	// Create -  Method to store
	store: async (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){

			res.render('feature-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				categorias,
				users
			});
		} else {
			await db.create({
                            name : req.body.name,
                            parent : req.body.parent,
                            active_menu: req.body.active_menu
					});
			
			res.redirect('/feature/list');
		}
		
	},

	// Update - Form to edit -TRABAJAR
	edit: async (req, res) => {
		if(req.cookies.login){
			const featureToEdit = await db.findByPk(req.params.id);
			let cookies = req.cookies;
			res.render('feature-edit-form',{featureToEdit,cookies});
		}else{
			res.redirect('/backend');
		}
	
	},
	// Update - Method to update
	update: async (req, res) => {

		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0){
			res.render('feature-edit-form',{ 
				errors: resultValidation.mapped(),
				featureToEdit: req.body,
				users
			});
		} else {
			await db.update({
                name : req.body.name,
                parent : req.body.parent,
                active_menu: req.body.active_menu
            },
			{
				where: {id: req.params.id}
			}
			);
			res.redirect('/feature/list');
		}
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		db.destroy({

			where: {id: req.params.id}

		});
		
		res.redirect('/feature/list');
	}

};

module.exports = controller;