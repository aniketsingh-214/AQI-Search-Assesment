const express = require('express');
const { handleGetCityAqi } = require('../controllers/aqiController');

const router = express.Router();

router.get('/', handleGetCityAqi);

module.exports = router;
