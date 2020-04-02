const route = require('express').Router();
const newsController = require('../controllers/newsController');

route.get('/', newsController.viewNews);

module.exports = route;