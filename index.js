const express = require('express')
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require ('./config/database');
const path = require ('path');

mongoose.connect(config.uri,(err)=> {
    if (err){
        console.log('Could Not connect to database', err)
    }
    else {
        console.log('Connected to database: ' + config.db)
    }
});

app.use(express.static(__dirname + '/client/dist/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => console.log("listening on port 8080"));