const dal = require('../DAL/mysql');
const { DbHandler } = {...require('./DbHandler') };
const uil = require('../UIL/users');
let retrieveData;

function connectDb() {
    return dal.connect();
}

function createNewDB() {
    return DbHandler.createDatabase();
}

function RegisterUsers(res, req) {
    values = { username: req.body.username, password: req.body.password, email: req.body.email }
        // const hashedPassword = bcrypt.hashSync(request.body.password, 10)
    dal.connectionExport().query("INSERT INTO users SET ?", values, function(error, results, fields) {
        if (error) throw error
        req.session.loggedin = true;
        // dal.runQueryWithParam(`UPDATE users SET id = ? WHERE email = ?`, [req.session.id, req.body.email])
        res.redirect('/login');
    });
}

function LoginUser(res, req) {
    values = [req.body.email, req.body.password];
    dal.connectionExport().query(`SELECT * FROM users WHERE email = ? AND password = ?`, values, function(error, results, fields) {
        if (results.length) {
            req.session.loggedin = true;
            retrieveData = [dal.extractDbResult(results)[0].email, dal.extractDbResult(results)[0].password, dal.extractDbResult(results)[0].username, dal.extractDbResult(results)[0].id];
            res.redirect('/home');
        } else res.send('Incorrect Email and/or Password!');
        res.end();
    });
}

function LogoutUser(res, req) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
}

function retrieveDataUser() {
    return retrieveData;
}

function dropTables() {
    return DbHandler.dropAllTables();
}


module.exports = {
    connectDb,
    createNewDB,
    dropTables,
    RegisterUsers,
    LoginUser,
    retrieveDataUser,
    LogoutUser
}