const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");
const { reset } = require('nodemon');
const bcrypt = require ('bcryptjs');
const User = require ('../models/User');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
        res.render('index', { products, toThousand,login: req.cookies.email});
	},
	search: (req, res) => {
		keywords = req.body.keywords;
		search = products.find(val => {
			if (val.name == keywords){
				return val;
			}
		})
		res.render('results',{keywords,search,login: req.cookies.email});
	},
    cart: (req, res) => {
        res.render('productCart',{login: req.cookies.email});
	},
    register: (req, res) => {
        res.render('register',{login: req.cookies.email});
	},
    login: (req,res) => {
        res.render('login',{login: req.cookies.email});
    },
	logout:(req, res) => {
		//usar res
		res.clearCookie('email');
		//después de borrar la cookie
		res.redirect('/login');
	},
    loginValidation: (req,res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			res.render('login',{ 
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else if( users.some( user => (user.email === req.body.email)&&(bcrypt.compareSync(req.body.password,user.password) && (user.role == '2'))) ){
			req.session.email = req.body.email;
			req.session.admin= true;
			res.cookie('login', 'true');
			res.cookie('email',req.session.email);
			res.redirect('/');
		}
        
    },
	// Create -  Method to store
	store: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0){
			res.render('register',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				login: req.cookies.login
			});
		} else {
			let userToCreate= {
				...req.body,
				password : bcrypt.hashSync(req.body.password,10),
				picture: "profile.png"
			}
			User.create(userToCreate);
			res.redirect('/login');
		}
		
	}

};

module.exports = controller;
