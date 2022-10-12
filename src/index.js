// process
//  .on('unhandledRejection', (reason, p) => {
//     console.log(`Unhandled Rejection at Promise: ${reason}`);
//  })
//  .on('uncaughtException', err => {
//     console.log(`Uncaught Exception thrown: ${err}`);
//  });

require('dotenv').config();

const { BOT_TOKEN, TEST_TOKEN, MONGODB_URI, ADMIN_ID } = process.env;
const {Telegraf, Scenes: {Stage}} = require('telegraf')

const {MongoClient} = require('mongodb')
const {session} = require('telegraf-session-mongodb')

const fs = require('fs')
const fsp = fs.promises;

// commands
const start = require('./commands/start')
const stats = require('./commands/stats')

// scenes 
const register = require('./scenes/register')
const eventsMenu = require('./scenes/eventsMenu')
const datesInput = require('./scenes/datesInput')
const roundTables = require('./scenes/roundTables')
// const shiftScene = require('./scenes/shift')
// const weekdaysScene = require('./scenes/weekdays')
// const sheduleScene = require('./scenes/shedule')
// const buildingScene = require('./scenes/building')
// const donateScene = require('./scenes/donate')
// const distributionScene = require('./scenes/distribution')
// const settingsScene = require('./scenes/settings')


const init = async (bot) =>{
    const stage = new Stage([
        register,
        eventsMenu,
        datesInput,
        roundTables,
    ]);
    const db = (await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db();
    bot.use(session(db));
    bot.use(stage.middleware())
    bot.command('start', start())
    bot.command('stats', stats())
    
    bot.command('distribution', (ctx, db)=>{
        console.log(ctx.session.userId)
        if(ctx.session.userId == ADMIN_ID){
            ctx.scene.enter('distribution')
        }
        else{
            return ctx.reply('У вас нет прав доступа для пользования этой коммандой!')
        }
    })
    
    bot.action(/[A-z]+$/, (ctx) => {
        var userAction = ctx.match[0]
        switch (userAction){
            case 'Register':
                ctx.scene.enter('register')
                break
        }
    })
    return bot
}

init(new Telegraf(TEST_TOKEN, { polling: true }), process.env).
then(async(bot)=> {
    await bot.launch()
    console.log(`Launched ${new Date}`)
})

module.exports = init
