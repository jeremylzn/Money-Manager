const dal = require('../../DAL/mysql');
const { DbHandler } = {...require('../DbHandler') };

class ExpensesPerUser {

    static createTable() {
        return dal.runQuery(`CREATE TABLE IF NOT EXISTS ExpensesPerUser(
                                Id                  int AUTO_INCREMENT PRIMARY KEY,
                                UserId              int NOT NULL,
                                Date                VARCHAR(30) NOT NULL,
                                Housing             decimal(10,2),
                                Food                decimal(10,2),
                                Transport           decimal(10,2),
                                Communication       decimal(10,2),
                                HousingCharges      decimal(10,2),
                                University          decimal(10,2),
                                FOREIGN KEY         (UserId) REFERENCES users(Id)
                                );`);

    }

    static dropTable() {
        return dal.runQuery('drop table if exists ExpensesPerUser;');
    }

    static async insertUsersTable() {
        return dal.runQueryWithParam("INSERT INTO ExpensesPerUser (UserId) VALUES ?", await ExpensesPerUser.getValues());
    }


    static async getValues() {
        let users = await dal.runQuery(`SELECT * FROM users`)
        let arr = [];
        for (let user of users) {
            let userId = await dal.runQueryWithParam("select id from users where id like  ?", user.id);
            arr.push([
                dal.extractDbResult(userId)[0].id
            ]);
        }
        return arr;
    }

}


module.exports = { ExpensesPerUser }