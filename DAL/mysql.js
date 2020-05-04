// Module dependencies
const mySql = require('mysql');
const bcrypt = require('bcrypt');
var session = require('express-session');
var bodyParser = require('body-parser');
const connectionConfig = require('./config.json');



//here we asiggn to the global var - the open connection that we created
var connectionExport = function() {
    return mySql.createConnection(connectionConfig);
}


function connect() {
    //here we asiggn to the global var - the open connection that we created
    connection = mySql.createConnection(connectionConfig);

    return new Promise((resolve, reject) => {
        connection.connect((err) => { err ? reject(err) : resolve(); });
    });
}

//-----------------------DDL - Data Defenition Language -------------------------
function createDB() {

    let { host, user, password } = {...connectionConfig }

    return new Promise(
            (resolve, reject) => {
                mySql.createConnection({ host, user, password }).query(`CREATE DATABASE IF NOT EXISTS ${connectionConfig.database};`,
                    (err, res) => { err ? reject(err) : resolve(); }
                )
            })
        .then(connect);
}

//-----------------------DML - Data Manipulation Language-------------------------
function runQuery(queryParam) {
    return new Promise((resolve, reject) => {
        connection.query(queryParam,
            (err, res) => { err ? reject(err) : resolve(res) })
    });

}

function runQueryWithParam(queryParam, queryValues) {
    return new Promise((resolve, reject) => {
        connection.query(queryParam, [queryValues],
            (err, res) => { err ? reject(err) : resolve(res) })
    });
}

function extractDbResult(res) {
    return JSON.parse((JSON.stringify(res)).replace("RowDataPacket", ""));
}


module.exports = {
    connect,
    createDB,
    runQuery,
    runQueryWithParam,
    connectionExport,
    extractDbResult
}