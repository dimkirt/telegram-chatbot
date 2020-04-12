const { IntentionRepository } = require('./intention-repository');
const { IntentionService } = require('./intention-service');

function createIntentionService() {
  const intentionRepository = new IntentionRepository();
  return new IntentionService({ intentionRepository });
}

module.exports = {
  createIntentionService,
};
