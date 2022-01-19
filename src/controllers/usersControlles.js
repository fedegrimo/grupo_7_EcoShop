const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");
const userDB = require ('../database/models/Define/User');
const { resourceUsage } = require('process');
const bcrypt = require ('bcryptjs');

const { db } = userDB;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

 const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
 const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {

	list: async (req, res) => {
		const users = await db.findAll();
        if(req.cookies.login){
			res.render('user-list',{users});
		}else{
			res.redirect('/backend');
		}
	 },
	create: (req, res) => {
		if(req.cookies.login){
			//TODO: Pasar los errores y los campos de usuario
			res.render('user-create-form');
		}else{
			res.redirect('/backend');
		}
		
	},
	store: (req, res) => {
		const resultValidation = validationResult(req);
		const fileImage = req.file;
		console.log('errores:',resultValidation );
		if (resultValidation.errors.length > 0){
			res.render('user-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		} else {
			userDB.db.create({
                firstname : req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                images: fileImage.filename,
                profile_id : req.body.profile_id
            });
			
			res.redirect('/users');
		}
		
	},
	edit: (req, res) => {
		const userToEdit = {}

		 let userField = userDB.db.findByPk(req.params.id);

		Promise.all([userField])
		 .then(([userField])=>{

			 console.log(userField);
			userToEdit = {
				name: resultado.dataValues.firstname,
				lastname: resultado.dataValues.lastname,
				email:resultado.dataValues.email,
				password: resultado.dataValues.password,
				picture: resultado.dataValues.images
			}
			res.render('user-edit-form',{oldData:userField, users});
			
		})
		
		// if(req.cookies.login){
		// 	// res.render('user-edit-form',{oldData:userToEdit, users});
		// }else{
		// 	res.redirect('/backend');
		// }
		
	},
	update: (req, res) => {

		const resultValidation = validationResult(req);
		const fileImage = req.file;
		if (resultValidation.errors.length > 0){
			res.render('user-edit-form',{ 
				errors: resultValidation.mapped(),
				oldData:req.body
			});

		} else {

			const filename = (fileImage) ? fileImage.filename : picture;
			
			userDB.db.update({
                firstname : req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                images: filename,
                profile_id : req.body.profile_id
            },
				{
					where: {id: req.params.id}
				}
			);
			res.redirect('/users');
		}
		
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		userDB.db.destroy({

			where: {id: req.params.id}

		});
		
		res.redirect('/users');
	}
};

module.exports = controller;
