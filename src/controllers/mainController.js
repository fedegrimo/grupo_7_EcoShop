const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");
const { reset } = require('nodemon');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
        res.render('index', { products, toThousand });
	},
	search: (req, res) => {
		keywords = req.body.keywords;
		search = products.find(val => {
			if (val.name == keywords){
				return val;
			}
		})
		res.render('results',{keywords,search});
	},
    cart: (req, res) => {
        res.render('productCart');
	},
    register: (req, res) => {
        res.render('register');
	},
    login: (req,res) => {
        res.render('login');
    },
    loginValidation: (req,res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			res.render('login',{ 
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else {
			validation = users.find(val => {
				if ((val.email === req.body.email) && (val.password === req.body.password)){
					return true;
				} 
			})
			
			if (validation){
				res.redirect('/products/list');
			} else {
				res.render('login', { errorLogin: "Usuario inválido"});
			}
			
		}
        
    },
	// Create -  Method to store
	store: (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			res.render('register',{ 
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else {
			const {nombre, apellido, email, password} = req.body;
			let id=1;
			if (users.length > 0){
				const lastIndex = users.length - 1;
				id = users[lastIndex].id + 1;
			}

			const val = {	'id':id,
							'nombre':nombre,
							'apellido':apellido,
							'email':email,
							'password':password};
			users.push(val);
			fs.writeFileSync(usersFilePath,JSON.stringify(users),'utf-8');
			res.redirect('/login');
		}
		
	},
};

module.exports = controller;
