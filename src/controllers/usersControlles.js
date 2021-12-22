const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");
const User = require ('../models/User');
const { resourceUsage } = require('process');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {

	list: (req, res) => {
        if(req.cookies.login){
			res.render('user-list',{users});
		}else{
			res.redirect('/backend');
		}
	 },
	login: (req, res) => {
		console.log('este es el query', req.body)
		const { email, password } = req.body;

		const resultValidation = validationResult(req);
		console.log(resultValidation);
		if (resultValidation.errors.length > 0){
			console.log('hubo error en validation');
			res.render('backend',{ 
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else if( users.some( user => (user.email === email)&&(user.password === password)) ){
			console.log('los datos fueron correctos');
			req.session.email = email;
			req.session.admin = true;
			res.cookie('login', 'true'); 
			res.redirect('clientes-list',{usersAll: users});
		}else{
			console.log('usuario y password incorrectos');
			res.render('backend',
				{
					loginFail:true,
					oldData: req.body
			});
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
			let userToCreate= {
				...req.body,
				picture:fileImage.filename
			}
			User.create(userToCreate);
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
					val.password=password;
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
