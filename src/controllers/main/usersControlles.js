const { validationResult } = require ("express-validator");
const userDB = require ('../../database/models/Define/User');
const profileDB = require ('../../database/models/Define/Profile');
const bcrypt = require ('bcryptjs');

const { db } = userDB;


const controller = {

	list: async (req, res) => {
		const users = await db.findAll();
        if(req.cookies.login){
			cookies = req.cookies;
			res.render('newUserList',{users,cookies});
		}else{
			res.redirect('/backend');
		}
	 },
	create: async (req, res) => {
		if(req.cookies.login){
			const profiles = await profileDB.db.findAll({
				where : {active_menu : 1}
			});
			cookies = req.cookies;
			res.render('user-create-form',{profiles,cookies});
		}else{
			res.redirect('/backend');
		}
		
	},
	store: async (req, res) => {
		const resultValidation = validationResult(req);
		const profiles = await profileDB.db.findAll({
			where : {active_menu : 1}
		});
		const fileImage = req.file.filename;
		cookies = req.cookies;
		if (resultValidation.errors.length > 0){
			res.render('user-create-form',{ 
				errors: resultValidation.mapped(),
				userToEdit: req.body,
				profiles,
				cookies
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
			const users = await db.findAll();
			res.render('newUserList',{users,cookies});
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
				cookies
			});

		} else {

			const filename = (fileImage) ? fileImage.filename : req.body.picture;
			const password = (req.body.password) ? bcrypt.hashSync(req.body.password,10)  : req.body.oldpassword;
			await userDB.db.update({
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
			const users = await db.findAll();
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
