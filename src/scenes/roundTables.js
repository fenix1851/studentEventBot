require('dotenv').config();
const {
    Scenes: {
        BaseScene
    },
    Telegraf,
    Context
} = require('telegraf')
const roundTables = new BaseScene('roundTables');
const roundTablesKeyboard = require('../keyboards/tables')
const {
    MongoClient, ObjectId
} = require('mongodb')
const {
    BOT_TOKEN,
    TEST_TOKEN,
    MONGODB_URI,
    ADMIN_ID
} = process.env;


roundTables.enter(async (ctx) => {
    try {
        ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
        const db = (await MongoClient.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })).db();
        const arrayOfTables = await db.collection('roundTables').find().toArray()
        console.log(arrayOfTables)
        ctx.telegram.sendMessage(ctx.chat.id, `
           Выбери направление:`, {
            reply_markup: {
                inline_keyboard: roundTablesKeyboard.shortKeyboard(arrayOfTables)
            }
        });


        roundTables.action(/.+$/, async (ctx) => {
                var userAction = ctx.match[0]
                if (ctx.scene.state.eventType == 'round') {
                    ctx.scene.enter('rounds', {
                        date: userAction
                    })
                } else if (ctx.scene.state.eventType == 'master') {
                    ctx.scene.enter('masters', {
                        date: userAction
                    })
                } else if (userAction == 'Back') {
                    ctx.scene.enter('datesInput', {
                        eventType: 'round'
                    })
                
                }
                else if( userAction == 'register'){
                    console.log(ctx.scene.state.tableId)
                    const id = new ObjectId(ctx.scene.state.tableId)
                    const table = await db.collection('roundTables').findOne({_id: id})
                    console.log(table)
                    if(!table.users.includes(ctx.from.id)&& table.availableMembers > 0){
                        table.users.push(ctx.from.id)
                        table.availableMembers -= 1
                        await db.collection('roundTables').updateOne({_id: id}, {$set: table})
                        ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
                        ctx.tg.sendMessage(ctx.chat.id, 'Вы успешно зарегистрировались на круглый стол', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                        text: 'Назад',
                                        callback_data: 'Back'
                                    }]
                                ]
                            }
                        })
                 
                    }
                    else{
                        ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
                        ctx.tg.sendMessage(ctx.chat.id, 'На этот стол нет мест или вы уже зарегестрировались на него.', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                        text: 'Назад',
                                        callback_data: 'Back'
                                    }]
                                ]
                            }
                        })
                    }
                }
                else {
                    ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
                    ctx.scene.state.tableId = userAction
                    const id = new ObjectId(ctx.scene.state.tableId)
                    const table = await db.collection('roundTables').findOne({_id: id})
                    // console.log(table)
                    ctx.tg.sendMessage(ctx.chat.id, `
Направление: ${table.direction}

Темы: ${table.topics}

Минестарство: ${table.departments}

Место: ${table.places}

Осталось мест: ${table.availableMembers}
                `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{
                                    text: 'Записаться',
                                    callback_data: 'register'
                                }],
                                [{
                                    text: 'Назад',
                                    callback_data: 'Back'
                                }]
                            ]
                        }
                    })
                }
            })
        

} catch (err) {
    console.error(err)
}
})

module.exports = roundTables