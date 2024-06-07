import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;
const webkitURL = process.env.WEBKIT_URL;

const bot = new Telegraf(token);

bot.command('start', async ctx => {
  const message = await ctx.reply(
    `Welcome!
    You're on the platform for organizing esports tournaments, always at your fingertips.
    Click the button below to get started.`,
    Markup.inlineKeyboard([Markup.button.webApp('Launch the app', webkitURL)])
  );

  try {
    await ctx.pinChatMessage(message.message_id);
  } catch (error) {
    console.error('Failed to pin the message:', error);
  }

  ctx.reply('Click here to launch the app 👇');
});

bot.command('help', ctx => {
  const helpMessage = `
  Here is the list of available commands:
  /start - Start the bot
  /help - Show the list of commands
  `;

  ctx.reply(helpMessage);
});

bot.launch();
