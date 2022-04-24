const express = require('express');
const route = express.Router();

// Controller
const QuestionController = require('../controllers/QuestionController');
const RoomController = require('../controllers/RoomController');

// /room
route.get('/:room', RoomController.open);
route.post('/create-room', express.urlencoded({ extended: true }), RoomController.create);
route.post('/enter-room', express.urlencoded({ extended: true }), RoomController.enter);
route.post('/question/create/:room', express.urlencoded({ extended: true }), QuestionController.create);
route.post('/:room/:question/:action', express.urlencoded({ extended: true }), QuestionController.index);

module.exports = route;