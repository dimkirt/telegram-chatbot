const greekUtils = require('greek-utils');
const { TelegramBotApi } = require('../libs/telegram');

const telegramBotApi = new TelegramBotApi({
  apiToken: process.env.TELEGRAM_BOT_API_TOKEN,
});


module.exports = {
  reactToUserMessage(message) {
    const { text } = message;
    const chatId = message.chat.id;
    const user = message.from.username;
    const msgId = message.message_id;

    const standardizedText = greekUtils.toGreeklish(text).toLowerCase();

    if (standardizedText === 'pop') {
      if (user === 'dimkirt') {
        return telegramBotApi.sendMessage(chatId, 'Ναι μπαμπά;');
      }
      return telegramBotApi.sendMessage(chatId, 'NETI');
    }

    if (standardizedText === 'end_conversation') {
      return telegramBotApi.sendMessage(chatId, 'Ante Geiaaaaaaaaaa!');
    }

    if (standardizedText.includes('popira')) {
      return telegramBotApi.sendMessage(chatId, 'parakalw', { reply_to_message_id: msgId });
    }

    if (standardizedText.includes('dab')) {
      return telegramBotApi.sendPhoto(chatId, 'https://imgur.com/bsiD2P7');
    }

    if (standardizedText.includes('sad')) {
      const caption = 'ＳＡＤ　ＢＯＹＺ';
      return telegramBotApi.sendPhoto(chatId, 'https://imgur.com/LeyYNEa', { caption });
    }

    if (standardizedText.includes('meli')) {
      return telegramBotApi.sendDocument(chatId, 'https://imgur.com/0K9r9n0.gif');
    }

    if (standardizedText === 'pop koumpwneis?') {
      const p1 = telegramBotApi.sendMessage(chatId, 'Όχι μαν μου, μόνο φυτικά παίρνω');
      const p2 = telegramBotApi.sendPhoto(chatId, 'https://imgur.com/ek277iv');
      return Promise.all([p1, p2]);
    }

    if (standardizedText === 'pop eisai kala?') {
      const p1 = telegramBotApi.sendMessage(chatId, 'Όχι μαν μου');
      const p2 = telegramBotApi.sendDocument(chatId, 'https://imgur.com/FWlJnDD.gif');
      return Promise.all([p1, p2]);
    }

    if (standardizedText === 'playlist_hiphop') {
      return telegramBotApi.sendMessage(
        chatId, 'https://www.youtube.com/playlist?list=PLAFQAQCf660pJgBxh13wGlbK_aQDoFZLi',
      );
    }

    if (standardizedText === 'location_dps') {
      return telegramBotApi.sendLocation(chatId, { latitude: 48.176464, longitude: 11.592553 });
    }

    return Promise.resolve();
  },
};
