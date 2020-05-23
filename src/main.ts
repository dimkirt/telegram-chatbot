import { TelegramBotApi } from './libs/telegram';
import { createApp } from './rest-api/app.js';

const DEFAULT_PORT = 3000;

function createTelegramWebhook() {
  const telegramBotApi = new TelegramBotApi({
    apiToken: process.env.TELEGRAM_BOT_API_TOKEN || '',
  });
  return telegramBotApi.setWebhook(process.env.TELEGRAM_WEBHOOK_URL || '', {});
}

async function main() {
  await createTelegramWebhook();
  const app = createApp();

  app.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.log(`Server started on: ${process.env.PORT || DEFAULT_PORT}`);
  });
}

main();
