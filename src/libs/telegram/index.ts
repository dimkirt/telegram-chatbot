import axios, { AxiosError, AxiosInstance } from 'axios';
import { isAxiosError } from '../util';


interface ITelegramBotApiProps {
  apiToken: string;
}

interface IMessageOptions {
  parse_mode?: 'HTML' | 'MarkdownV2';
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  reply_markup?: any; // TODO: Define type explicitly
}

interface IPhotoOptions extends IMessageOptions {
  caption?: string;
}

interface IDocumentOptions extends IMessageOptions {
  caption?: string;
  thumb?: string | any;  // TODO: Define type explicitly
}

interface ILocation {
  latitude: number;
  longitude: number;
}

interface ILocationOptions extends Omit<IMessageOptions, 'parse_mode' | 'disable_web_page_preview'> {
  live_period: number;
}

export class TelegramBotApi {
  private apiToken: string;
  private client: AxiosInstance;
  
  constructor({ apiToken }: ITelegramBotApiProps) {
    this.apiToken = apiToken;
    this.client = axios.create({
      baseURL: `https://api.telegram.org/bot${this.apiToken}/`,
    });
  }

  /**
   * Set the webhook for receiving messages from Telegram
   *
   * @param {string} callbackUrl The endpoint that Telegram will push messages to
   * @param {object} options Optional arguments https://core.telegram.org/bots/api#setwebhook
   */
  async setWebhook(callbackUrl: string, options: any) {
    const body = {
      url: callbackUrl,
      ...options,
    };

    const res = await this.client.post('setWebhook', body).catch(TelegramError);
    return { success: res.data.result, message: res.data.description };
  }

  /**
   * Get bot metadata
   */
  async getMe() {
    const res = await this.client.get('getMe').catch(TelegramError);
    return res.data.result;
  }

  /**
   * Send a text message to the destination chat
   *
   * @param {string} chatId Destination chat
   * @param {string} text Text message
   * @param {object} options Optional arguments https://core.telegram.org/bots/api#sendmessage
   */
  async sendMessage(chatId: string, text: string, options: IMessageOptions) {
    const body = {
      chat_id: chatId,
      text,
      ...options,
    };

    const res = await this.client.post('sendMessage', body).catch(TelegramError);
    return res.data.result;
  }

  /**
   * Send a photo message to the destination chat
   *
   * @param {string} chatId Destination chat
   * @param {string} photoUrl Photo resource
   * @param {object} options Optional arguments https://core.telegram.org/bots/api#sendphoto
   */
  async sendPhoto(chatId: string, photoUrl: string, options: IPhotoOptions) {
    const body = {
      chat_id: chatId,
      photo: photoUrl,
      ...options,
    };

    const res = await this.client.post('sendPhoto', body).catch(TelegramError);
    return res.data.result;
  }

  /**
   * Send a document message to the destination chat
   *
   * @param {string} chatId Destination chat
   * @param {string} documentUrl Document resource
   * @param {object} options Optional arguments https://core.telegram.org/bots/api#senddocument
   */
  async sendDocument(chatId: string, documentUrl: string, options: IDocumentOptions) {
    const body = {
      chat_id: chatId,
      document: documentUrl,
      ...options,
    };

    const res = await this.client.post('sendDocument', body).catch(TelegramError);
    return res.data.result;
  }

  /**
   * Send a location message to the destination chat
   *
   * @param {string} chatId Destination chat
   * @param {object} location Location object { latitude: 0.0, longitude: 0.0 }
   * @param {object} options Optional arguments https://core.telegram.org/bots/api#sendlocation
   */
  async sendLocation(chatId: string, location: ILocation, options: ILocationOptions) {
    const body = {
      chat_id: chatId,
      ...location,
      ...options,
    };

    const res = await this.client.post('sendLocation', body).catch(TelegramError);
    return res.data.result;
  }
}

function TelegramError(error: AxiosError | Error): never {
  if (isAxiosError(error) && error.response) {
    throw new Error(error.response.data.description);
  }
  throw error;
}
