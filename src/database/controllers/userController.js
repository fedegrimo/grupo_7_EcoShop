
const { validationResult } = require ("express-validator");
const userDB = require ('../models/Define/User');
const { resourceUsage } = require('process');
const bcrypt = require ('bcryptjs');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

	list: (req, res) => {
        if(req.cookies.login){
			res.render('user-list',{users});
		}else{
			res.redirect('/backend');
		}
	 },
	create: (req, res) => {
		if(req.cookies.login){
			res.render('user-create-form',{users});
		}else{
			res.redirect('/backend');
		}
		
	},
	store: (req, res) => {

		const resultValidation = validationResult(req);
		const fileImage = req.file;

		if (resultValidation.errors.length > 0){
			res.render('user-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				users
			});
			
		} else {

            userDB.User.create({
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                image: fileImage.filename,
                profile_id : req.body.profile_id
            });
			
			res.redirect('/users');
		}
		
	},
	edit: (req, res) => {
		const userToEdit = users.find(val => {
			if (val.id == req.params.id){
				return val;
			}
		});

		if(req.cookies.login){
			res.render('user-edit-form',{oldData:userToEdit, users});
		}else{
			res.redirect('/backend');
		}
		
	},
	update: (req, res) => {

		const resultValidation = validationResult(req);
		const fileImage = req.file;
		if (resultValidation.errors.length > 0){
			res.render('user-edit-form',{ 
				errors: resultValidation.mapped(),
				oldData:req.body,
				users
			});

		} else {

			const {name, lastname, email, password,role,picture} = req.body;
			const id = req.params.id;
			const filename = (fileImage) ? fileImage.filename : picture;
			const newUser = [];
			users.map(val=>{
				if (val.id == id){
					val.name=name;
					val.lastname=lastname;
					val.email=email;
					val.password=bcrypt.hashSync(password,10);
					val.picture=filename;
					val.role = role
					newUser.push(val);
				} else {
					newUser.push(val);
				}
			});
			fs.writeFileSync(usersFilePath,JSON.stringify(newUser),'utf-8');
			res.redirect('/users');
		}
		
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = req.params.id;
		const newUser = [];
		users.map(val => {
			if (val.id != id){
				newUser.push(val);
			}
		});
		
		fs.writeFileSync(usersFilePath,JSON.stringify(newUser),'utf-8');
		res.redirect('/users');
	}
};

module.exports = controller;
