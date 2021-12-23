const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");
const { reset } = require('nodemon');
const bcrypt = require ('bcryptjs');
const User = require ('../models/User');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
	backend: (req, res) => {

		if(req.cookies.login){
			res.redirect('/products/list',{usersAll: users})
		}else{
			res.redirect('/',{loginFail:false,
								  usersAll: users
			});
		}
		
	},
	backendLogin: (req, res) => {
		const { email, password } = req.body;
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			console.log('hubo error en validation');
			res.render('backend',{ 
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else if( users.some( user => (user.email === email)&&(bcrypt.compareSync(password,user.password))) ){
			console.log('los datos fueron correctos');
			req.session.email = email;
			req.session.admin= true;
			res.cookie('login', 'true'); 
			res.redirect('/products/list');
		}else{
			console.log('usuario y password incorrectos');
			res.render('backend',
				{
					loginFail:true,
					oldData: req.body
			});
		}
			
	},

	logout:(req, res) => {
		console.log(req.cookies.login);
		//usar res
		res.clearCookie('login');
		//después de borrar la cookie
		res.redirect('/backend');
	},
	users: (req, res) => {
		if(req.cookies.login){
			res.render('clientes-list',{users});
		}else{
	 		res.render('backend',{loginFail:false});
	 	}
	 },
	usersLogin: (req, res) => {
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
			req.session.admin= true;
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
	usersCreate: (req, res) => {
		res.render('user-create-form');
	},
	usersStore: (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			res.render('user-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		} else {
			let userToCreate= {
				...req.body,
				picture:fileImage.filename
			}
			Product.create(userToCreate);
			res.redirect('/backend/users');
		}
		
	},
	userEdit: (req, res) => {
		const userToEdit = users.find(val => {
			if (val.id == req.params.id){
				return val;
			}
		});
		res.render('user-edit-form',{userToEdit});
	},
	userUpdate: (req, res) => {

		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			res.render('user-edit-form',{ 
				errors: resultValidation.mapped(),
				userToEdit: req.body,
				categorias
			});
		} else {
			const {name, lastName, email, password,pictureprofile} = req.body;
			const id = req.params.id;
			const fileImage = req.file;
			const filename = (fileImage) ? fileImage.filename : picture;
			const newUser = [];
			products.map(val=>{
				if (val.id == id){
					val.name=name;
					val.lastName=lastName;
					val.email=email;
					val.password=password;
					val.pictureprofile=filename;
					newUser.push(val);
				} else {
					newUser.push(val);
				}
			});
			fs.writeFileSync(usersFilePath,JSON.stringify(newUser),'utf-8');
			res.redirect('/backend/users');
		}
		
	}
};

module.exports = controller;
