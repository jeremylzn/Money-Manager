// const dal = require('../../DAL/mysql');
// const { DbHandler } = {...require('../DbHandler') };

// class DatePerStats {

//     static createTable() {
//         return dal.runQuery(`CREATE TABLE IF NOT EXISTS datePerStats(
//                                 Id                  int AUTO_INCREMENT PRIMARY KEY,
//                                 Date                VARCHAR(30) NOT NULL,
//                                 UserId              int NOT NULL,
//                                 ExpensesId          int NOT NULL,
//                                 IncomesId           int NOT NULL,
//                                 FOREIGN KEY         (UserId) REFERENCES users(Id),
//                                 FOREIGN KEY         (ExpensesId) REFERENCES ExpensesPerUser(Id),
//                                 FOREIGN KEY         (IncomesId) REFERENCES IncomesPerUser(Id)
//                                 );`);

//     }

//     static dropTable() {
//         return dal.runQuery('drop table if exists datePerStats;');
//     }

//     static async insertUsersTable() {
//         return dal.runQueryWithParam("INSERT INTO datePerStats (UserId) VALUES ?", await DatePerStats.getValues());
//     }


//     static async getValues() {
//         let users = await dal.runQuery(`SELECT * FROM users`)
//         let arr = [];
//         for (let user of users) {
//             let userId = await dal.runQueryWithParam("select id from users where id like  ?", user.id);
//             arr.push([
//                 dal.extractDbResult(userId)[0].id
//             ]);
//         }
//         return arr;
//     }

// }


// module.exports = { DatePerStats }