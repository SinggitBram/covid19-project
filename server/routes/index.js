const route = require('express').Router();
const newsController = require('../controllers/newsController');

route.get('/', newsController.viewNews);
route.get('/:country', newsController.viewNewsCountry);

module.exports = route;