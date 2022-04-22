const express = require('express');
const route = express.Router();

route.get('/', (req, res) => res.render('index', { page: 'create-pass' }));

module.exports = route;