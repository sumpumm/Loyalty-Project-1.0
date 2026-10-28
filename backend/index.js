const express = require('express');
const dns = require('dns');
const {connectMongoDb} = require('./conn/connection');

//routes
const authRoute = require('./routes/auth');

const app = express();
const PORT = 8000;

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

connectMongoDb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/auth',authRoute);

app.listen(PORT,()=>console.log(`SERVER STARTED AT PORT: ${PORT}`));
