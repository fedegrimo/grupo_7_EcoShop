const { validationResult } = require ("express-validator");

const featureDB = require ('../../database/models/Define/Feature');

const { db } = featureDB;

const active_menu = [{id: false, name: "NO"},
					 {id: true, name: "SI"} ];

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
			let features = await  db.findAll({
				where:{
					parent: 0
				}
			});
			let cookies = req.cookies;
			res.render('feature-create-form', {cookies,features,active_menu });

			
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
				active_menu
			});
		} else {
			await db.create({
                            name : req.body.name,
                            parent : req.body.parent,
                            active_menu: req.body.active_menu
					});
			
			res.redirect('/products/feature/list');
		}
		
	},

	// Update - Form to edit -TRABAJAR
	edit: async (req, res) => {
		if(req.cookies.login){
			const featureToEdit = await db.findByPk(req.params.id);
			let cookies = req.cookies;
			const features = await db.findAll({
				where:{
					parent: 0
				}
			});
			res.render('feature-edit-form',{featureToEdit,features,active_menu,cookies});
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
			res.redirect('/products/feature/list');
		}
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		db.destroy({

			where: {id: req.params.id}

		});
		
		res.redirect('/products/feature/list');
	}

};

module.exports = controller;