require('dotenv').config();
const { BOT_TOKEN, TEST_TOKEN, MONGODB_URI, ADMIN_ID } = process.env;
const {MongoClient} = require('mongodb')
const fs = require('fs');
const parse = require('csv-parse').parse;
const objToDb = {
    
}
const parser = parse({delimiter: ','}, function(err, data){
    data.splice(0,2)
    for(let i = 0; i < data.length; i++){
        objToDb[i] = {}
        for(let j = 0; j < data[i].length; j++){
            switch(j){
                case 1:
                    objToDb[i].users = []
                    objToDb[i].direction = data[i][j]
                    break;
                case 2:
                    objToDb[i].departments = data[i][j]
                    break;
                case 3:
                    objToDb[i].enterprises = data[i][j]
                    break;
                case 4:
                    objToDb[i].topics = data[i][j]
                    break;
                case 5:
                    objToDb[i].places = data[i][j]
                    break;
                case 6:
                    objToDb[i].maxMembers = data[i][j]
                    objToDb[i].availableMembers = data[i][j]
                    break;
            }
                
        }
    }
    // console.log(objToDb)
    dbCall()

});
async function dbCall(){
    const db = (await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db();
    for (const key in objToDb) {
        console.log(key)
        const element = objToDb[key];
        await db.collection("roundTables").insertOne(element, function (err, res) {
            if (err) throw err;
            console.log("elemt: ", element);
        })
    }
}
fs.createReadStream('./src/data/tables.csv').pipe(parser);
