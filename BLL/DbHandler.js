const dal = require('../DAL/mysql');
const { User } = {...require('./tables/user') };
const { ExpensesPerUser } = {...require('./tables/expensesPerUser') };
const { IncomesPerUser } = {...require('./tables/incomesPerUser') };

class DbHandler {

    static async getTableCols(tableName) {
        let res = await dal.runQuery(`SELECT COLUMN_NAME 
                             FROM INFORMATION_SCHEMA.COLUMNS 
                             WHERE table_name = '${tableName}' AND table_schema = 'ManageEI';`);

        return dal.extractDbResult(res).map(e => e.COLUMN_NAME);
    }

    static createDatabase() {
        return new Promise(
            (resolve, reject) => {
                dal.createDB()
                    .then(DbHandler.createAllTables)
                    .then(DbHandler.insertAllTables)
                    .then(resolve)
                    .catch(reject)
            });

    }

    static createAllTables() {
        return Promise.all([
            User.createTable(),
            ExpensesPerUser.createTable(),
            IncomesPerUser.createTable()
        ]);

    }

    static dropAllTables() {
        return dal.connect()
            .then(() => dal.runQuery('SET FOREIGN_KEY_CHECKS = 0'))
            .then(
                () =>
                Promise.all([
                    User.dropTable(),
                    ExpensesPerUser.dropTable(),
                    IncomesPerUser.dropTable()
                ])
            )
            .then(() => dal.runQuery('SET FOREIGN_KEY_CHECKS = 1'))
    }

    static insertAllTables() {
        // return ExpensesPerUser.insertUsersTable()
        //     .then(IncomesPerUser.insertUsersTable());
    }


}

module.exports = { DbHandler };