const express = require('express');
const bodyParser = require('body-parser');

const { createBot } = require('../bot-core');

function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
}

const asyncErrorHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function createApp() {
  const bot = createBot();
  const app = express();
  app.use(bodyParser.json());
  app.use(cors);

  app.post('/messages', asyncErrorHandler(async (req, res) => {
    const message = req.body.message ? req.body.message : req.body.edited_message;
    await bot.reactToUserMessage(message);
    return res.json({ success: true });
  }));

  app.get('/health', (req, res) => res.json({ up: true }));

  return app;
}

module.exports = {
  createApp,
};
