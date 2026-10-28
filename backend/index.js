const express = require('express');
const dns = require('dns');
const {connectMongoDb} = require('./conn/connection');

//routes
const userAuthRoute = require('./routes/userAuth');
const businessAuthRoute = require('./routes/businessAuth');

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

app.use('/user',userAuthRoute);
app.use('/business',businessAuthRoute);

app.listen(PORT,()=>console.log(`SERVER STARTED AT PORT: ${PORT}`));
