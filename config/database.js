const mongoose = require('mongoose');
const db = mongoose.connection;
require('dotenv').config();


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
});

db.on('connected', function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
});