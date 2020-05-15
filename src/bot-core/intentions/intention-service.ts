import * as greekUtils from 'greek-utils';
import { IntentionRepository } from './intention-repository';

export interface IIntentionServiceProps {
  intentionRepository: IntentionRepository;
}

export class IntentionService {
  private readonly intentionRepository: IntentionRepository;

  constructor({ intentionRepository }: IIntentionServiceProps) {
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
    throw new Error('No matching Intention');
  }

  determineAction({ intention, chatId, userId }) {
    // User specific action has priority over chat specific action
    const matchingUsers = intention.users.filter((user: any) => user.username === userId);
    if (matchingUsers.length) {
      return matchingUsers[0].action;
    }

    const matchingChats = intention.chats.filter((chat: any) => chat.id === chatId);
    if (matchingChats.length) {
      return matchingChats[0].action;
    }

    return intention.action;
  }
}
