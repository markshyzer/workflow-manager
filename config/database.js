const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/jobsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
});

db.on('connected', function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
});