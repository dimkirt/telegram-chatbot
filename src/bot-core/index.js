const { Bot } = require('./bot');
const { createIntentionService } = require('./intentions');
const { createActionService } = require('./actions');

function createBot() {
  const intentionService = createIntentionService();
  const actionService = createActionService();
  return new Bot({
    actionService, intentionService,
  });
}

module.exports = {
  createBot,
};
