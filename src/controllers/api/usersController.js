const userDB = require ('../../database/models/Define/User');
const { db } = userDB;
const host = 'http://localhost:3000/img/avatars/';

const controller = {
	list: async (req, res) => {
        let users =  await db.findAll();

        let apiUsers = users.map(user =>{
            return({
            id: user.id, 
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            images: host + user.images,
            profile_id: user.profile_id
            });
        });

        let respuesta = {
            meta: {
                status : 200,
                total: users.length,
                url: '/api/users'
            },
            data: apiUsers
        }
        res.json(respuesta);
},
     detail: async (req, res) => {
		let id = req.params.id;
		let user =  await db.findByPk(id);
		let respuesta = {
            meta: {
                status : 200,
                total: user.length,
                url: '/api/users/:id'
            },
            data: {
                id: user.id, 
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                images: host + user.images,
                profile_id: user.profile_id
            }
        }
        res.json(respuesta);
	}
};

module.exports = controller;
