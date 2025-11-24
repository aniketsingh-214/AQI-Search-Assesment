const { getCityAqi } = require('../services/aqiService');

async function handleGetCityAqi(req, res, next) {
  try {
    const city = (req.query.city || '').trim();
    if (!city) {
      return res.status(400).json({ error: 'Query param "city" is required' });
    }

    const result = await getCityAqi(city);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { handleGetCityAqi };
