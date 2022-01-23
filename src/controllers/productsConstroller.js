const fs = require('fs');
const path = require('path');
const { validationResult } = require ("express-validator");
const { reset } = require('nodemon');
const Product = require ('../models/Product');


// PRODUCTS
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
 const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productDB = require ('../database/models/Define/Product');
const categoryDB = require ('../database/models/Define/Category');
const imageProductDB = require ('../database/models/Define/ImageProduct');

const { db } = productDB;
const{db:dbImage} = imageProductDB;


// USERS

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products -trabajar
	index: (req, res) => {
		res.render('products',{productsAll: products,
								usersAll: users,
								login: req.cookies.email
		});
	},
	// List administration product -trabajar
	list: async (req, res) => {
		const products =  await db.findAll();
		/*productsdb.forEach( product =>{
			let images = dbImage.findOne({
				where : {product_id: product.id}
			}).then((resultado)=>{
				products.push({
					product,
					fileName: resultado
				})
			})
		})*/
		console.log(products)
		if(req.cookies.login){
			res.render('products-list',{products, users});
		}else{
			res.redirect('/backend');
		}
		
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let rowProduct = products.find(val => {
			if (val.id == id){
				return val;
			}
			
		});
		res.render('productDetail',{ rowProduct, products, toThousand,login: req.cookies.email})
	},

	// Create - Form to create -trabajar
	create: async (req, res) => {
		if(req.cookies.login){

			const categorias = await categoryDB.db.findAll();
			res.render('product-create-form', {categorias, users });

			
		}else{
			res.redirect('/backend');
		}
		
	},

    // Add - Cart
	cart: (req, res) => {
		res.render('productCart',{category});
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const resultValidation = validationResult(req);
		const fileImage = req.file;
		if (resultValidation.errors.length > 0){

			res.render('product-create-form',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				categorias,
				users
			});
		} else {
			productDB.db.create({
				name : req.body.title,
				price: req.body.price,
				offer: req.body.discount,
				description: req.body.description,
				category_id: req.body.category,
				active: false
			});
			
			/*imageProductDB.db.create({
				fileName: fileImage.filename,
				product_id: created._previousDataValues.id
			});*/
			
			res.redirect('/products/list');
		}
		
	},

	// Update - Form to edit -TRABAJAR
	edit: async (req, res) => {
		if(req.cookies.login){

			const categorias = await categoryDB.db.findAll();
			const productToEdit = await db.findByPk(req.params.id);

			res.render('product-edit-form',{productToEdit,categorias,users});
		}else{
			res.redirect('/backend');
		}
	
	},
	// Update - Method to update
	update: async (req, res) => {

		const resultValidation = validationResult(req);
		console.log('here/update', resultValidation);
		if (resultValidation.errors.length > 0){
			res.render('product-edit-form',{ 
				errors: resultValidation.mapped(),
				productToEdit: req.body,
				users
			});
		} else {

			await productDB.db.update({
                name : req.body.title,
                price: req.body.price,
                offer: req.body.discount,
				description: req.body.description,
				category_id: req.body.category,
				active: false
            },
			{
				where: {id: req.params.id}
			}
			);

			// const {title, price, discount, category, description,picture} = req.body;
			// const id = req.params.id;
			// const fileImage = req.file;
			// const filename = (fileImage) ? fileImage.filename : picture;
			// const newProducts = [];
			// products.map(val=>{
			// 	if (val.id == id){
			// 		val.title=title;
			// 		val.price=price;
			// 		val.discount=discount;
			// 		val.category=category;
			// 		val.description=description;
			// 		val.picture=filename;
			// 		newProducts.push(val);
			// 	} else {
			// 		newProducts.push(val);
			// 	}
			// });
			// fs.writeFileSync(productsFilePath,JSON.stringify(newProducts),'utf-8',' ');
			res.redirect('/products/list');
		}
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		productDB.db.destroy({

			where: {id: req.params.id}

		});
		
		res.redirect('/products/list');
	}

};

module.exports = controller;