const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const AQI_API_BASE = process.env.AQI_API_BASE;
const AQI_API_TOKEN = process.env.AQI_API_TOKEN;
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 300000);
const CACHE_MAX_ENTRIES = Number(process.env.CACHE_MAX_ENTRIES || 100);

module.exports = {
  PORT,
  MONGODB_URI,
  AQI_API_BASE,
  AQI_API_TOKEN,
  CACHE_TTL_MS,
  CACHE_MAX_ENTRIES
};
