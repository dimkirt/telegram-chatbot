const greekUtils = require('greek-utils');

class IntentionService {
  constructor({ intentionRepository }) {
    this.intentionRepository = intentionRepository;
  }

  async determineIntention({ text }) {
    const standardizedText = greekUtils.toGreeklish(text).toLowerCase();
    const intentions = await this.intentionRepository.find();
    const isExactMatch = (intention) => intention.match === 'EXACT' && intention.keyword === standardizedText;
    const isIncludeMatch = (intention) => intention.match === 'INCLUDE' && standardizedText.includes(intention.keyword);

    const matchingIntentions = intentions.filter((intention) => isExactMatch(intention) || isIncludeMatch(intention));
    if (matchingIntentions.length) {
      return matchingIntentions[0];
    }
    return Promise.resolve();
  }

  determineAction({ intention, chatId, userId }) {
    // User specific action has priority over chat specific action
    const matchingUser = intention.users.filter((user) => user.username === userId);
    if (matchingUser.length) {
      return matchingUser.action;
    }

    const matchingChat = intention.chats.filter((chat) => chat.id === chatId);
    if (matchingChat.length) {
      return matchingChat.action;
    }

    return intention.action;
  }
}

module.exports = {
  IntentionService,
};
