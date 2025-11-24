const axios = require('axios');
const { AQI_API_BASE, AQI_API_TOKEN } = require('../config/env');
const { aqiCache } = require('./cacheService');
const SearchLog = require('../models/SearchLog');

function classifyAqi(aqi) {
  if (aqi == null || isNaN(aqi)) return 'Unknown';
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

function normalizeResponse(providerData) {
  // Based on AQICN structure: { data: { aqi, city, dominentpol, iaqi, time, attributions } }
  const data = providerData?.data;
  if (!data) {
    throw new Error('Invalid AQI data from provider');
  }

  const aqi = data.aqi;
  const iaqi = data.iaqi || {};

  const breakdown = {};
  for (const [key, value] of Object.entries(iaqi)) {
    breakdown[key] = value?.v ?? null;
  }

  const normalized = {
    city: data.city?.name || 'Unknown',
    aqi,
    category: classifyAqi(aqi),
    dominantPollutant: data.dominentpol || null,
    time: data.time?.s || null,
    geo: data.city?.geo || [],
    attribution: (data.attributions || []).map(a => a.name),
    breakdown
  };

  return normalized;
}

async function fetchAqiFromProvider(city) {
  if (!AQI_API_BASE || !AQI_API_TOKEN) {
    throw new Error('AQI API env vars not configured');
  }

  const url = `${AQI_API_BASE}/feed/${encodeURIComponent(city)}/?token=${AQI_API_TOKEN}`;
  const response = await axios.get(url, { timeout: 8000 });

  if (response.data.status !== 'ok') {
    const msg = response.data.data || 'Unknown error from AQI provider';
    const err = new Error(`Provider error: ${msg}`);
    err.statusCode = 404;
    throw err;
  }

  return normalizeResponse(response.data);
}

async function getCityAqi(city) {
  const key = city.toLowerCase().trim();

  // Check cache
  const cached = aqiCache.get(key);
  if (cached) {
    return { ...cached, fromCache: true };
  }

  // Fetch from provider
  const normalized = await fetchAqiFromProvider(key);

  // Save in cache
  aqiCache.set(key, normalized);

  // Save log in DB (fire and forget)
  SearchLog.create({
    city: normalized.city,
    aqi: normalized.aqi,
    category: normalized.category,
    dominantPollutant: normalized.dominantPollutant
  }).catch(err => {
    console.warn('Failed to save search log:', err.message);
  });

  return { ...normalized, fromCache: false };
}

module.exports = { getCityAqi };
