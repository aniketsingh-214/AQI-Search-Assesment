const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');
const { PORT } = require('./config/env');

const server = http.createServer(app);

async function start() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
