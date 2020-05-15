import { ActionRepository } from './action-repository';

export interface IActionServiceProps {
  telegramBotApi: any;
  openWeatherApi: any;
  newsApi: any;
  imgurApi: any;
  actionRepository: ActionRepository;
}

interface MessageOptions {
  caption?: string;
  parse_mode?: 'HTML' | 'MarkdownV2';
  reply_to_message_id?: string;
}

export class ActionService {
  private readonly telegramBotApi: any;
  private readonly openWeatherApi: any;
  private readonly newsApi: any;
  private readonly imgurApi: any;
  private readonly actionRepository: ActionRepository;
  private readonly functionFactory: any;

  constructor({
    telegramBotApi,
    openWeatherApi,
    newsApi,
    imgurApi,
    actionRepository,
  }: IActionServiceProps) {
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

  async executeAction({ actionId, chatId, msgId }: { actionId: string, chatId: string, msgId: string }) {
    const action = await this.actionRepository.findOne(actionId);
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

  sendMessage(payload: any) {
    const options: MessageOptions = {};
    if (payload.message.reply) {
      options.reply_to_message_id = payload.msgId;
    }
    return this.telegramBotApi.sendMessage(payload.chatId, payload.message.text, options);
  }

  sendPhoto(payload: any) {
    const options: MessageOptions = {};
    if (payload.photo.caption) {
      options.caption = payload.photo.caption;
    }
    return this.telegramBotApi.sendPhoto(payload.chatId, payload.photo.photoUrl, options);
  }

  sendDocument(payload: any) {
    const options: MessageOptions = {};
    if (payload.document.caption) {
      options.caption = payload.document.caption;
    }
    return this.telegramBotApi.sendDocument(payload.chatId, payload.document.documentUrl, options);
  }

  sendLocation(payload: any) {
    const options: MessageOptions = {};
    if (payload.location.caption) {
      options.caption = payload.location.caption;
    }
    return this.telegramBotApi.sendLocation(payload.chatId, payload.location, options);
  }

  async sendMessageWithWeatherForCity(payload: any) {
    const weatherData = await this.openWeatherApi.getWeatherByCity(payload.city, payload.country);
    const text = `<strong>${weatherData.name}: </strong> ${weatherData.weather[0].description}
      <strong>Temperature: </strong>${weatherData.main.temp}°C,  
      <strong>Humidity: </strong>${weatherData.main.humidity}%, 
      <strong>Winds: </strong>${weatherData.wind.speed} Bft`;

    const options: MessageOptions = {
      parse_mode: 'HTML',
    };

    return this.telegramBotApi.sendMessage(payload.chatId, text, options);
  }

  async sendMessageArticlesForNewsSource(payload: any) {
    const sendNewsArticleToTelegram = (article: any) => {
      const options: MessageOptions = {
        parse_mode: 'HTML',
      };
      const text = `<b>${article.title}:</b> ${article.url}`;
      return this.telegramBotApi.sendMessage(payload.chatId, text, options);
    }

    const articles = await this.newsApi.getArticlesBySource(payload.source);
    return Promise.all(articles.map(sendNewsArticleToTelegram.bind(this)));
  }
}
