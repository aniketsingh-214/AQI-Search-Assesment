const express = require('express');
const { handleGetCityAqi } = require('../controllers/aqiController');

const router = express.Router();

// GET /api/aqi?city=Delhi
router.get('/', handleGetCityAqi);

module.exports = router;
