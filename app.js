const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const r_Index = require('./routers/index');
const r_Add = require('./routers/add');
const path = require('path');
const port = 3000;
const app = express();

// mongoose settings
mongoose.connect('mongodb://localhost:27017/amaliyot');
const db = mongoose.connection;
db.on('open', () => {
    console.log('mongoose run');
});
db.on('error', (err) => {
    console.log(err, 'monogose error');
});


//body-parser settings
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// engine settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// module exports 

app.use(r_Index);
app.use(r_Add);

// public settings
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));


// server has been started
app.listen(port, () => {
    console.log(`server http://localhost:${port} da ishladi`);
});