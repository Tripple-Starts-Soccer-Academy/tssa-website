// Reuse the existing Express app as a Vercel Serverless Function handler
const app = require('../backend/server');

module.exports = app;

