const bll = require('../BLL/mysql');
const dal = require('../DAL/mysql');


function addStatsController(app) {




    app.post("/home/expensesData", (req, res) => {
        let expenses = req.body.json_expenses;
        console.log(expenses);
        dal.connectionExport().query("INSERT INTO ExpensesPerUser SET ?", expenses, function(error, results, fields) {
            if (error) {
                if (error.sqlMessage.includes("Unknown column")) {
                    dal.connectionExport().query(`ALTER table ExpensesPerUser add column (${error.sqlMessage.substring(16,error.sqlMessage.indexOf("' in 'field list'"))} decimal(10,2) NOT NULL);`, function(error, results, fields) {
                        if (error) throw error

                    });

                }
            }

        });

        // dal.connectionExport().query("INSERT INTO datePerStats SET ?", expenses, function(error, results, fields) {
        //     if (error) {
        //         if (error.sqlMessage.includes("Unknown column")) {
        //             dal.connectionExport().query(`ALTER table ExpensesPerUser add column (${error.sqlMessage.substring(16,error.sqlMessage.indexOf("' in 'field list'"))} decimal(10,2) NOT NULL);`, function(error, results, fields) {
        //                 if (error) throw error

        //             });

        //         }
        //     }

        // });


    });

    app.post("/home/incomesData", (req, res) => {
        let incomes = req.body.json_incomes;
        console.log(incomes);
        dal.connectionExport().query("INSERT INTO IncomesPerUser SET ?", incomes, function(error, results, fields) {
            if (error) {
                if (error.sqlMessage.includes("Unknown column")) {
                    dal.connectionExport().query(`ALTER table IncomesPerUser add column (${error.sqlMessage.substring(16,error.sqlMessage.indexOf("' in 'field list'"))} decimal(10,2) NOT NULL);`, function(error, results, fields) {
                        if (error) throw error

                    });

                }
            }

        });

    });


    app.put("/api/user/edit", (req, res) => {

    });

    app.delete("/api/user/remove", (req, res) => {

    });

}

module.exports = {
    addStatsController
}