class Bot {
  constructor({
    actionService,
    intentionService,
  }) {
    this.actionService = actionService;
    this.intentionService = intentionService;
  }

  async reactToUserMessage(message) {
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

module.exports = {
  Bot,
};
