// const {getuser, createuser , updateuser,deleteuser} = require('../controllers/getUser')
// const express= require('express')
// const routes = express.Router();

// routes('/',getuser)
// routes('/',createuser)
// routes('/:id',updateuser)
// routes('/:id',deleteuser)

// module.exports = routes ;


const { getuser, createuser, updateuser, deleteuser } = require('../controllers/getUser');
const express = require('express');
const routes = express.Router();

routes.get('/', getuser);
routes.post('/', createuser);
routes.put('/:id', updateuser);
routes.delete('/:id', deleteuser);

module.exports = routes;
