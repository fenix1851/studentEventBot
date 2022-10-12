const {
    Scenes: {
        BaseScene
    },
    Telegraf,
    Context
} = require('telegraf')
const register = new BaseScene('register');

register.enter((ctx) => {
    try {
        const delegations = ['Сахалин (Местные)',
            'Сахалин(Неместные)',
            'Хабаровск',
            'Амур',
            'Камчатка',
            'Бурятия',
            'Приморье',
            'Забайкалье(Чита)',
            'Якутия'
        ]
        ctx.telegram.sendMessage(ctx.chat.id, `
           Отправь своё ФИО, например: Иванов Иван Иванович`)
        register.hears(/[A-z]/, (ctx) => {
            ctx.reply('На русском пожалуйста')
        })
        register.hears(/^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/, async (ctx) => {
            ctx.session.fio = ctx.message.text
            ctx.telegram.sendMessage(ctx.chat.id, `
           Теперь выбери свою делигацию:`, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: delegations[0],
                                callback_data: '1'
                            },
                            {
                                text: delegations[1],
                                callback_data: '2'
                            }
                        ],
                        [{
                                text: delegations[2],
                                callback_data: '3'
                            },
                            {
                                text: delegations[3],
                                callback_data: '4'
                            }
                        ],
                        [{
                                text: delegations[4],
                                callback_data: '5'
                            },
                            {
                                text: delegations[5],
                                callback_data: '6'
                            }
                        ],
                        [{
                                text: delegations[6],
                                callback_data: '7'
                            },
                            {
                                text: delegations[7],
                                callback_data: '8'
                            }
                        ],
                        [{
                            text: delegations[8],
                            callback_data: '9'
                        }]
                    ]
                }
            })
        })
        register.action(/[0-9]+$/, (ctx) => {
            var userAction = ctx.match[0]
            ctx.session.delegation = userAction
            ctx.scene.leave('register')
            ctx.scene.enter('eventsMenu')
        })
    } catch (err) {
        console.error(err)
    }
})

module.exports = register