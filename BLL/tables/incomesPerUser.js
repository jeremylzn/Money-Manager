const dal = require('../../DAL/mysql');

class IncomesPerUser {

    static createTable() {
        return dal.runQuery(`CREATE TABLE IF NOT EXISTS IncomesPerUser(
                                Id                  int AUTO_INCREMENT PRIMARY KEY,
                                UserId              int NOT NULL,
                                Date                VARCHAR(30) NOT NULL,
                                Salary              decimal(10,2),
                                Scholarships        decimal(10,2),
                                FromParents         decimal(10,2),
                                Extras              decimal(10,2),
                                FOREIGN KEY         (UserId) REFERENCES users(Id)
                                );`);

    }

    static dropTable() {
        return dal.runQuery('drop table if exists IncomesPerUser;');
    }

    static async insertUsersTable() {
        return dal.runQueryWithParam("INSERT INTO IncomesPerUser (UserId) VALUES ?", await IncomesPerUser.getValues());
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


module.exports = { IncomesPerUser }