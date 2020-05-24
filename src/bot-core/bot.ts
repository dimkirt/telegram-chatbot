import { ActionService } from './actions/action-service';
import { IntentionService } from './intentions/intention-service';

export interface IBotProps {
  actionService: ActionService,
  intentionService: IntentionService,
}

export class Bot {
  private readonly actionService: ActionService;
  private readonly intentionService: IntentionService;

  constructor({
    actionService,
    intentionService,
  }: IBotProps) {
    this.actionService = actionService;
    this.intentionService = intentionService;
  }

  async reactToUserMessage(message: any) {
    const intention = await this.intentionService.determineIntention({ text: message.text });
    const determineActionDto = {
      intention,
      chatId: message.chat.id,
      userId: message.from.username,
    };
    const actionId = this.intentionService.determineAction(determineActionDto);
    const executeActionDto = {
      actionId,
      chatId: message.chat.id,
      msgId: message.message_id,
    };
    return this.actionService.executeAction(executeActionDto);
  }
}
