const axios = require('axios');

function TelegramError(error) {
  if (error.isAxiosError) {
    throw new Error(error.response.data.description);
  }
}

class TelegramBotApi {
  constructor({ apiToken }) {
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
  async setWebhook(callbackUrl, options) {
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
  async sendMessage(chatId, text, options) {
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
  async sendPhoto(chatId, photoUrl, options) {
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
  async sendDocument(chatId, documentUrl, options) {
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
  async sendLocation(chatId, location, options) {
    const body = {
      chat_id: chatId,
      ...location,
      ...options,
    };

    const res = await this.client.post('sendLocation', body).catch(TelegramError);
    return res.data.result;
  }
}

module.exports = {
  TelegramBotApi,
};
