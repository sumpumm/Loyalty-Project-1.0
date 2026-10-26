const mongoose = require('mongoose');

const uri = "mongodb+srv://samarpansaralapps_db_user:eK9NyCQmNCKx2CRU@cluster0.5kdwkqq.mongodb.net/?appName=Cluster0";

async function connectMongoDb(){
    return mongoose.connect(uri).then(()=>console.log("MongoDB Connected.")).catch((err)=> console.log("Mongo Error",err));
}

module.exports = {connectMongoDb,};