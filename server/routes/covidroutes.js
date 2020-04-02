const express = require('express')
const route = express.Router()
const covidcontroller = require('../controllers/covidcontroller')

route.get('/', covidcontroller.globalstat)
route.get('/:country', covidcontroller.countrystat)


module.exports = route