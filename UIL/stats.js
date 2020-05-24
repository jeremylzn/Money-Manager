const bll = require('../BLL/mysql');
const dal = require('../DAL/mysql');


function addStatsController(app) {


    app.post("/home/incomesData", async(req, res) => {
        let incomes = req.body.json_incomes;
        let expenses = req.body.json_expenses;
        //----------Verif Date--------
        let result_incomes = await dal.runQueryWithParam(`SELECT * FROM IncomesPerUser WHERE Date = ? `, incomes.Date);
        let result_expenses = await dal.runQueryWithParam(`SELECT * FROM ExpensesPerUser WHERE Date = ? `, expenses.Date);

        // If there is the same date in the DB
        if (result_incomes.length > 0 && result_expenses.length > 0) {
            await dal.runQueryWithParam(`DELETE FROM IncomesPerUser WHERE Date=? `, incomes.Date);
            await dal.runQueryWithParam(`DELETE FROM ExpensesPerUser WHERE Date=? `, expenses.Date);
        }
        // Insert in incomes table
        try {
            await dal.runQueryWithParam(`INSERT INTO IncomesPerUser SET ?`, incomes);
        } catch (error) {
            if (error.sqlMessage.includes("Unknown column")) {
                await dal.runQuery(`ALTER table IncomesPerUser add column (${error.sqlMessage.substring(16,error.sqlMessage.indexOf("' in 'field list'"))} decimal(10,2));`);
                await dal.runQueryWithParam(`INSERT INTO IncomesPerUser SET ?`, incomes);
            }
            // To add for the reserved words as column's name
        }
        // Insert in expenses table
        try {
            await dal.runQueryWithParam(`INSERT INTO ExpensesPerUser SET ?`, expenses);

        } catch (error) {
            console.log(expenses)
            if (error.sqlMessage.includes("Unknown column")) {
                await dal.runQuery(`ALTER table ExpensesPerUser add column (${error.sqlMessage.substring(16,error.sqlMessage.indexOf("' in 'field list'"))} decimal(10,2));`);
                await dal.runQueryWithParam(`INSERT INTO ExpensesPerUser SET ?`, expenses);

            }
            // To add for the reserved words as column's name
        }
    });


    app.post("/home/stats", (req, res) => {

    });

    app.delete("/api/user/remove", (req, res) => {

    });

}

module.exports = {
    addStatsController
}