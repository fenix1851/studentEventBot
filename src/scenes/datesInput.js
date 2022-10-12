const {
    Scenes: {
        BaseScene
    },
    Telegraf,
    Context
} = require('telegraf')
const datesInput = new BaseScene('datesInput');
const datesKeyboard = require('../keyboards/dates')

datesInput.enter((ctx) => {
    try {
        ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
        let text = ''
        if(ctx.scene.state.eventType == 'masters'){
            text = 'мастер-класса'
        }
        else if(ctx.scene.state.eventType == 'round'){
            text = 'круглого стола'
        }
        else if(ctx.scene.state.eventType == 'excursions'){
            text = 'экскурсий'
        }
        else if(ctx.scene.state.eventType == 'programs'){
            text = 'образовательных программ'
        }
        ctx.telegram.sendMessage(ctx.chat.id, `
           Выбери дату ${text}:`, {
            reply_markup: {
                inline_keyboard: datesKeyboard(ctx.scene.state.eventType)
            }
        });

        datesInput.action(/[A-z]+$/, (ctx) => {
            var userAction = ctx.match[0]
            if (userAction == 'Back') {
                ctx.scene.enter('eventsMenu')
            }
        })
        datesInput.action(/[0-9]+$/, (ctx) => {
            var userAction = ctx.match[0]
            if(ctx.scene.state.eventType == 'round'){
                ctx.scene.enter('roundTables', {date: userAction})
            }
            else if(ctx.scene.state.eventType == 'master'){
                ctx.scene.enter('masters', {date: userAction})
            }
            else{ 
                ctx.scene.enter('events')
            }
        })

    } catch (err) {
        console.error(err)
    }
})

module.exports = datesInput