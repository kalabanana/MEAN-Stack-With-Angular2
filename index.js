const express = require('express')
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const config = require ('./config/database');
const path = require ('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(config.uri,(err)=> {
    if (err){
        console.log('Could Not connect to database', err)
    }
    else {
        console.log('Connected to database: ' + config.db)
    }
});

//Middleware
// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// } not safe


app.use(cors({
    origin: 'http://localhost:4200' //cross origin domain
}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => console.log("listening on port 8080"));