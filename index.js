const { Telegraf } = require('telegraf');
const bot = new Telegraf('1778448882:AAG-NWP4WiTajeLrkH16-3VtukU5AiIc0rM');

bot.start((ctx) => ctx.reply('Welcome'))

bot.on('message', (ctx) => {
  console.log(ctx);
  ctx.reply('👍')
})

bot.launch()
