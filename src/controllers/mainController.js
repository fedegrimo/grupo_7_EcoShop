const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");

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
			let {email,password} = req.body;
			if (email === 'eco' && password === 'shop'){
				res.redirect('/products/list');
			} else {
				res.render('login', { errorLogin: "Usuario inválido"});
			}
			
		}
        
    }
};

module.exports = controller;
