class ActionService {
  constructor({
    telegramBotApi,
    openWeatherApi,
    newsApi,
    imgurApi,
    actionRepository,
  }) {
    this.telegramBotApi = telegramBotApi;
    this.openWeatherApi = openWeatherApi;
    this.newsApi = newsApi;
    this.imgurApi = imgurApi;
    this.actionRepository = actionRepository;
    this.functionFactory = {
      sendMessage: this.sendMessage,
      sendPhoto: this.sendPhoto,
      sendDocument: this.sendDocument,
      sendLocation: this.sendLocation,
      sendMessageWithWeatherForCity: this.sendMessageWithWeatherForCity,
      sendMessageArticlesForNewsSource: this.sendMessageArticlesForNewsSource,
    };
  }

  async executeAction({ actionId, chatId, msgId }) {
    const action = await this.actionRepository.findOne({ id: actionId });
    if (!action) {
      throw new Error('Action not found');
    }

    const isValidAction = action.type in this.functionFactory;
    if (!isValidAction) {
      throw new Error('Not valid action type');
    }

    const payload = { ...action.payload, chatId, msgId };
    return this.functionFactory[action.type].call(this, payload);
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
    return Promise.all(articles.map(sendNewsArticleToTelegram.bind(this)));
  }
}

module.exports = {
  ActionService,
};
