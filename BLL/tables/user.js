const dal = require('../../DAL/mysql');
class User {

    static createTable() {

        return dal.runQuery('CREATE TABLE IF NOT EXISTS users (' +
            'id INT NOT NULL AUTO_INCREMENT,' +
            'PRIMARY KEY(id),' +
            'username VARCHAR(30) NOT NULL,' +
            'password VARCHAR(60) NOT NULL,' +
            'email VARCHAR(30) NOT NULL' +
            ');'
        );
    }

    static dropTable() {
        return dal.runQuery('DROP TABLE IF EXISTS users;');
    }


}


module.exports = {
    User,
}