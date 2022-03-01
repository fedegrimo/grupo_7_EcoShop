const { validationResult } = require ("express-validator");
const bcrypt = require ('bcryptjs');
const productDB = require ('../../database/models/Define/Product');
const userDB = require ('../../database/models/Define/User');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: async (req, res) => {
		let products =  await productDB.db.findAll({
			where:{
				category_id: 2,
				active: 1
			}
		});
        res.render('index', { products, toThousand,login: req.cookies.usuario});
	},
	search: (req, res) => {
		keywords = req.body.keywords;
		search = products.find(val => {
			if (val.name == keywords){
				return val;
			}
		})
		res.render('results',{keywords,search,login: req.cookies.usuario});
	},
    cart: (req, res) => {
        res.render('productCart',{login: req.cookies.usuario, cookies: req.cookies});
	},
    register: (req, res) => {
        res.render('register',{login: req.cookies.usuario});
	},
    login: (req,res) => {
        res.render('login',{login: req.cookies.usuario});
    },
	logout:(req, res) => {
		//usar res
		res.clearCookie('email');
		res.clearCookie('usuario');
		res.clearCookie('firstname');
		res.clearCookie('lastname');
		//después de borrar la cookie
		res.redirect('/login');
	},
    loginValidation: async (req,res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			res.render('login',{ 
				errors: resultValidation.mapped(),
				oldData: req.body,
				login: req.cookies.usuario
			});
		} else {
			let verificacion = await userDB.db.findOne({
				where : {
					email: req.body.email,
					profile_id: 2
				}
			});
			
			if (verificacion){
				if (bcrypt.compareSync(req.body.password,verificacion.password)){
					req.session.usuario = verificacion.firstname + " " + verificacion.lastname;
					req.session.firstname = verificacion.firstname;
					req.session.lastname = verificacion.lastname;
					req.session.email = verificacion.email;
					req.session.admin= false;
					res.cookie('login', 'true');
					res.cookie('usuario', req.session.usuario); 
					res.cookie('email', req.session.email); 
					res.cookie('firstname', req.session.firstname); 
					res.cookie('lastname', req.session.lastname); 
					res.redirect('/');
				} else {
					res.render('login',{ 
						errors: {password : {msg: "Contraseña incorrecta"}},
						oldData: req.body,
						login: req.cookies.usuario
					});
				}
			}
		
		}
        
    },
	// Create -  Method to store
	store: async (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0){
			// res.render('register',{ 
			// 	errors: resultValidation.mapped(),
			// 	oldData: req.body,
			// 	login: req.cookies.login
			// });
			res.status(400).json({ 
					errors: resultValidation.mapped(),
					login: req.cookies.login
				});
		} else {
			await userDB.db.create({
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                images: "profile.png",
                profile_id : req.body.role
            });
			
			res.redirect('/login');
		}
		
	}

};

module.exports = controller;
