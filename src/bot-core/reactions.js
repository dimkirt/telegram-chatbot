const greekUtils = require('greek-utils');

class Bot {
  constructor({
    telegramBotApi,
    openWeatherApi,
    newsApi,
    imgurApi,
    actionsRepository,
    intentionService,
  }) {
    this.telegramBotApi = telegramBotApi;
    this.openWeatherApi = openWeatherApi;
    this.newsApi = newsApi;
    this.imgurApi = imgurApi;
    this.actionsRepository = actionsRepository;
    this.intentionService = intentionService;
    this.functionFactory = {
      sendMessage: this.sendMessage,
      sendPhoto: this.sendPhoto,
      sendDocument: this.sendDocument,
      sendLocation: this.sendLocation,
      sendMessageWithWeatherForCity: this.sendMessageWithWeatherForCity,
      sendRandomPhotoFromImgurAlbum: this.sendRandomPhotoFromImgurAlbum,
      sendRandomPhotoFromImgurSubreddit: this.sendRandomPhotoFromImgurSubreddit,
    };
  }

  executeAction(action, chatId, msgId) {
    const isValidAction = action.type in Object.keys(this.functionFactory);
    if (isValidAction) {
      const payload = { ...action.payload, chatId, msgId };
      return this.functionFactory[action.type].call(payload);
    }
    return Promise.resolve();
  }

  sendMessage(payload) {
    const options = {};
    if (payload.message.reply) {
      options.reply_to_message_id = payload.msgId;
    }
    return this.telegramBotApi.sendMessage(payload.chatId, payload.message.text, options);
  }

  sendPhoto(payload) {
    const options = {};
    if (payload.photo.caption) {
      options.caption = payload.photo.caption;
    }
    return this.telegramBotApi.sendPhoto(payload.chatId, payload.photo.photoUrl, options);
  }

  sendDocument(payload) {
    const options = {};
    if (payload.document.caption) {
      options.caption = payload.document.caption;
    }
    return this.telegramBotApi.sendDocument(payload.chatId, payload.document.documentUrl, options);
  }

  sendLocation(payload) {
    const options = {};
    if (payload.location.caption) {
      options.caption = payload.location.caption;
    }
    return this.telegramBotApi.sendLocation(payload.chatId, payload.location, options);
  }

  async sendMessageWithWeatherForCity(payload) {
    const weatherData = await this.openWeatherApi.getWeatherByCity(payload.city, payload.country);
    const text = `<strong>${weatherData.name}: </strong> ${weatherData.weather[0].description}
      <strong>Temperature: </strong>${weatherData.main.temp}°C,  
      <strong>Humidity: </strong>${weatherData.main.humidity}%, 
      <strong>Winds: </strong>${weatherData.wind.speed} Bft`;

    const options = {
      parse_mode: 'HTML',
    };

    return this.telegramBotApi.sendMessage(payload.chatId, text, options);
  }

  async sendMessageArticlesForNewsSource(payload) {
    function sendNewsArticleToTelegram(article) {
      const options = {
        parse_mode: 'HTML',
      };
      const text = `<b>${article.title}:</b> ${article.url}`;
      return this.telegramBotApi.sendMessage(payload.chatId, text, options);
    }

    const articles = await this.newsApi.getArticlesBySource(payload.source);
    return Promise.all(articles.map(sendNewsArticleToTelegram));
  }

  reactToUserMessage(message) {
    const { text } = message;
    const chatId = message.chat.id;
    const user = message.from.username;
    const msgId = message.message_id;

    const standardizedText = greekUtils.toGreeklish(text).toLowerCase();
    const intention = this.intentionService.determineIntention({ standardizedText, chatId, user });
    const action = this.actionsRepository.findOne({ id: intention.action });

    if (!action) {
      return Promise.resolve();
    }
    return this.executeAction(action, chatId, msgId);
  }
}

module.exports = {
  Bot,
};
