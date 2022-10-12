const {
    Scenes: {
        BaseScene
    },
    Telegraf,
    Context
} = require('telegraf')
const eventsMenu = new BaseScene('eventsMenu');

eventsMenu.enter((ctx) => {
    try {
        ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
        ctx.telegram.sendMessage(ctx.chat.id, `
           Ты можешь записаться на мастер-классы или круглые столы, выбери что тебе нужно:`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: 'Мастер-классы',
                            callback_data: 'masters'
                        },
                        {
                            text: 'Круглые столы',
                            callback_data: 'round'
                        }
                    ],
                    [{
                        text: 'Экскурсии',
                        callback_data: 'excursions'
                    },
                    {
                        text: 'Образовательные программы',
                        callback_data: 'programs'
                    }
                ]
                ]
            }
        });

        eventsMenu.action(/[A-z]+$/, (ctx) => {
            var userAction = ctx.match[0]
            ctx.scene.enter('datesInput', {eventType: userAction})
        })
    } catch (err) {
        console.error(err)
    }
})

module.exports = eventsMenu