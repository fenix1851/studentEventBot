module.exports = () => async (ctx)=>{
    ctx.session.userId = ctx.update.message.from.id
    // ctx.scene.enter('datesInput', {eventType: 'round'})
    ctx.telegram.sendMessage(ctx.chat.id, `
Приветствуем тебя, боец студенческих отрядов!😎
Этот бот создан для тебя, чтобы ты мог записаться на круглые столы и мастер классы на нашем Дальневосточном слёте 🏖️
Давай  начнем с небольшой регистрации:`,
    {
        reply_markup : {
            inline_keyboard: [
                [
                    {text: `Регистрация`, callback_data: 'Register'}
                ],
            ]
        }
    }
    )
}