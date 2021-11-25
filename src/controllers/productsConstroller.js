const fs = require('fs');
const path = require('path');
const { render } = require('../../server');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products -trabajar
	index: (req, res) => {
		res.render('products',{productsAll: products});
	},
	// List administration product -trabajar
	list: (req, res) => {
		res.render('products-list',{products: products});
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
		res.render('product-create-form');
	},

    // Add - Cart
	cart: (req, res) => {
		res.render('productCart',{category});
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, category, description} = req.body;
		const lastIndex = products.length - 1;
		const id = products[lastIndex].id + 1;
		const val = {	'id':id,
						'name':name,
						'price':price,
						'image':'img-bicicleta-fierce.jpg',
						'discount':discount,
						'category':category,
						'description':description};
		products.push(val);
		fs.writeFileSync(productsFilePath,JSON.stringify(products),'utf-8');
		res.redirect('/products');
	},

	// Update - Form to edit -TRABAJAR
	edit: (req, res) => {
		const productToEdit = products.find(val => {
			if (val.id == req.params.id){
				return val;
			}
		})

		//TODO: ver category
		res.render('product-edit-form',{productToEdit});
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, discount, category, description} = req.body;
		const id = req.params.id;
		const newProducts = [];
		products.map(val=>{
			if (val.id == id){
				val.name=name;
				val.price=price;
				val.discount=discount;
				val.category=category;
				val.description=description;
				newProducts.push(val);
			} else {
				newProducts.push(val);
			}
		})
		fs.writeFileSync(productsFilePath,JSON.stringify(newProducts),'utf-8');
		res.redirect('detail/' + id);
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
		res.redirect('/products');
	}

};

module.exports = controller;