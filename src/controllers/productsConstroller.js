const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");
const { reset } = require('nodemon');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const categorias = [{clave : "in-sale",
					valor: "En Oferta"},
					{clave:"visited",
					valor: "Visitado"}];
const controller = {
	// Root - Show all products -trabajar
	index: (req, res) => {
		res.render('products',{productsAll: products});
	},
	// List administration product -trabajar
	list: (req, res) => {
		res.render('products-list',{products});
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let rowProduct = products.find(val => {
			if (val.id == id){
				return val;
			}
			
		});
		res.render('productDetail',{ rowProduct, products, toThousand})
	},

	// Create - Form to create -trabajar
	create: (req, res) => {
		res.render('product-create-form', {categorias});
	},

    // Add - Cart
	cart: (req, res) => {
		res.render('productCart',{category});
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			res.render('product-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				categorias
			});
		} else {
			const {title, price, discount, category, description} = req.body;
			const lastIndex = products.length - 1;
			const id = products[lastIndex].id + 1;
			const fileImage = req.file;
			const val = {	'id':id,
							'picture':fileImage.filename,
							'title':title,
							'price':price,
							'discount':discount,
							'category':category,
							'description':description};
			products.push(val);
			fs.writeFileSync(productsFilePath,JSON.stringify(products),'utf-8');
			res.redirect('/products/list');
		}
		
	},

	// Update - Form to edit -TRABAJAR
	edit: (req, res) => {
		const productToEdit = products.find(val => {
			if (val.id == req.params.id){
				return val;
			}
		})

		//TODO: ver category
		res.render('product-edit-form',{productToEdit,categorias});
	},
	// Update - Method to update
	update: (req, res) => {

		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			res.render('product-edit-form',{ 
				errors: resultValidation.mapped(),
				productToEdit: req.body,
				categorias
			});
		} else {
			const {title, price, discount, category, description,picture} = req.body;
			const id = req.params.id;
			const fileImage = req.file;
			const filename = (fileImage) ? fileImage.filename : picture;
			const newProducts = [];
			products.map(val=>{
				if (val.id == id){
					val.title=title;
					val.price=price;
					val.discount=discount;
					val.category=category;
					val.description=description;
					val.picture=filename;
					newProducts.push(val);
				} else {
					newProducts.push(val);
				}
			});
			fs.writeFileSync(productsFilePath,JSON.stringify(newProducts),'utf-8');
			res.redirect('/products/list');
		}
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = req.params.id;
		const newProducts = [];
		products.map(val => {
			if (val.id != id){
				newProducts.push(val);
			}
		});
		
		fs.writeFileSync(productsFilePath,JSON.stringify(newProducts),'utf-8');
		res.redirect('/products/list');
	}

};

module.exports = controller;