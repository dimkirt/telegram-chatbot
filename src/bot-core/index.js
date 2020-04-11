
const { TelegramBotApi } = require('../libs/telegram');
const { OpenWeatherApi } = require('../libs/open-weather-map');
const { NewsApi } = require('../libs/news-api');
const { ImgurApi } = require('../libs/imgur');

const { Bot } = require('./bot');
const actionsRepository = require('./data');

function createBot() {
  const telegramBotApi = new TelegramBotApi({
    apiToken: process.env.TELEGRAM_BOT_API_TOKEN,
  });

  const openWeatherApi = new OpenWeatherApi({
    apiToken: process.env.OPENWEATHER_API_TOKEN,
    language: 'en',
  });

  const newsApi = new NewsApi({
    apiToken: process.env.NEWS_API_TOKEN,
  });

  const imgurApi = new ImgurApi({
    apiClientId: process.env.IMGUR_CLIENT_ID,
    apiClientSecret: process.env.IMGUR_CLIENT_SECRET,
  });

  return new Bot({
    telegramBotApi, openWeatherApi, newsApi, imgurApi, actionsRepository,
  });
}

module.exports = {
  createBot,
};
