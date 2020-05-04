// Module dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const user = require('./users');
const stats = require('./stats');
const bll = require('../BLL/mysql');
const bcrypt = require('bcrypt');

const app = express();
const path = require('path');


// Configuration server

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/register.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
    secret: 'codeManage',
    resave: true,
    saveUninitialized: true
}));




// add to our "app" server - the controllers that we created in sperated files
user.addUserController(app);
stats.addStatsController(app);



// Begin listening
let successCallback = () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("server is listening on port 5000");
    });
};

let failCallback = (err) => {
    console.log("can not run app", err.stack);
    process.exit();
};

switch (process.argv[2]) {
    case 'create':
        bll.createNewDB().then(successCallback).catch(failCallback);
        break;
    case 'drop':
        bll.dropTables()
            .then(
                () => {
                    console.log("drop with success");
                    process.exit();
                }
            )
            .catch(failCallback);
        break;
    default:
        bll.createNewDB().then(successCallback).catch(failCallback);
}