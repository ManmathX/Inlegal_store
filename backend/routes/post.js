const express = require('express');
const { getpost, createpost, updatepost, deletepost } = require('../controllers/getPost');

const route = express.Router();

route.get('/', getpost);          
route.post('/', createpost);      
route.put('/:id', updatepost);   
route.delete('/:id', deletepost); 

module.exports = route;
