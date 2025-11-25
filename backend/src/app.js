const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const aqiRoutes = require('./routes/aqiRoutes');
const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/aqi', aqiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
