import { Bot } from './bot';
import { createIntentionService } from './intentions';
import { createActionService } from './actions';

export function createBot() {
  const intentionService = createIntentionService();
  const actionService = createActionService();
  return new Bot({
    actionService, intentionService,
  });
}
