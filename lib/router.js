const { Telegraf } = require('telegraf');
const bot = new Telegraf('1778448882:AAG-NWP4WiTajeLrkH16-3VtukU5AiIc0rM');
const Settlement = require('./settlement');
const getCountryFunc = (ctx) => {
  Settlement.getCountry().then(
    getCountry => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        'Выберите страну:',
        getCountry
      )
    }
  )
}
const getRegionFunc = (ctx, country) => {
  Settlement.getRegion(country).then(
    getRegion => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        'Выберите область:',
        getRegion
      )
    }
  )
}
const getCityFunc = (ctx, country, region) => {
  Settlement.getCity(country, region).then(
    getCity => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        'Выберите город:',
        getCity
      )
    }
  )
}
const resSettlement = (ctx, country, region, city) => {
  Settlement.getText(country, region, city).then(
    getText => {
      ctx.telegram.sendMessage(ctx.from.id, `${getText}\n\ncountry id: ${country}\nregion id: ${region}\ncity id: ${city}`)
    }
  )
}
exports.listen = () => {
  bot.start((ctx) => {
    getCountryFunc(ctx)
  })
  bot.on('message', (ctx) => {
    getCountryFunc(ctx)
  })
  bot.action(/.+/, ctx => {
    if (ctx.match[0].split('_')[0] == 'settlement') {
      if (ctx.match[0].split('_').length == 2) {
        if (ctx.match[0].split('_')[1] == 'back') {
          getCountryFunc(ctx)
        }else{
          getRegionFunc(ctx, ctx.match[0].split('_')[1])
          return ctx.answerCbQuery(`Выберите область`);
        }
      }else if(ctx.match[0].split('_').length == 3){
        getCityFunc(ctx, ctx.match[0].split('_')[1], ctx.match[0].split('_')[2])
        return ctx.answerCbQuery(`Выберите город`);
      }else if(ctx.match[0].split('_').length == 4){
        resSettlement(ctx, ctx.match[0].split('_')[1], ctx.match[0].split('_')[2], ctx.match[0].split('_')[3])
      }
    }
  })
  bot.launch()
}
