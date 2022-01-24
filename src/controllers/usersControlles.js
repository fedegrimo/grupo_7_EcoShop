const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");
const userDB = require ('../database/models/Define/User');
const profileDB = require ('../database/models/Define/Profile');
const { resourceUsage } = require('process');
const bcrypt = require ('bcryptjs');

const { db } = userDB;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

	list: async (req, res) => {
		const users = await db.findAll();
        if(req.cookies.login){
			cookies = req.cookies;
			res.render('user-list',{users,cookies});
		}else{
			res.redirect('/backend');
		}
	 },
	create: (req, res) => {
		if(req.cookies.login){
			cookies = req.cookies;
			res.render('user-create-form',{cookies});
		}else{
			res.redirect('/backend');
		}
		
	},
	store: (req, res) => {
		const resultValidation = validationResult(req);
		const fileImage = req.file;
		cookies = req.cookies;
		if (resultValidation.errors.length > 0){
			res.render('user-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		} else {
			userDB.db.create({
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                images: fileImage.filename,
                profile_id : req.body.profile_id
            });
			
			res.render('users',{cookies});
		}
		
	},
	edit: async (req, res) => {
		
		const profiles = await profileDB.db.findAll({
			where : {active_menu : 1}
		});
		const usersToEdit = await db.findByPk(req.params.id);
		
		if(req.cookies.login){
			cookies = req.cookies;
			res.render('user-edit-form',{userToEdit:usersToEdit.dataValues,profiles,cookies});
		}else{
			res.render('backend',{ 
				errors: [],
				loginFail:false
			});
		}
		
	},
	update: async (req, res) => {

		const resultValidation = validationResult(req);
		const profiles = await profileDB.db.findAll({
			where : {active_menu : 1}
		});
		
		const fileImage = req.file;
		cookies = req.cookies;
		if (resultValidation.errors.length > 0){
			res.render('user-edit-form',{ 
				errors: resultValidation.mapped(),
				userToEdit: req.body,
				profiles,
				users
			});

		} else {

			const filename = (fileImage) ? fileImage.filename : req.body.picture;
			const password = (req.body.password) ? bcrypt.hashSync(req.body.password,10)  : req.body.oldpassword;
			userDB.db.update({
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: password,
                images: filename,
                profile_id : req.body.role
            },
				{
					where: {id: req.params.id}
				}
			);
			res.redirect('/users',{cookies});
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
