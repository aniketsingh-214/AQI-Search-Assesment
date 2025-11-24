const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, index: true },
    aqi: { type: Number, required: true },
    category: { type: String, required: true },
    dominantPollutant: { type: String },
    rawProvider: { type: String, default: 'aqicn' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SearchLog', searchLogSchema);
