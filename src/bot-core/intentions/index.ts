import { IntentionRepository } from './intention-repository';
import { IntentionService } from './intention-service';

export function createIntentionService() {
  const intentionRepository = new IntentionRepository();
  return new IntentionService({ intentionRepository });
}

