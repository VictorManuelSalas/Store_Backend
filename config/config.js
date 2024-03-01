require('dotenv').config(); 

const config = {
    port: process.env.SERVER_PORT || 3001,
    dataBase:{
        mongoURL: process.env.MONGO_DB
    }
}

module.exports = config