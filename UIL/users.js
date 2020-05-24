const bll = require('../BLL/mysql');
const { User } = {...require('../BLL/tables/user') };


function addUserController(app) {

    app.get("/user/info", (req, res) => {


    });

    app.get("/home/userInfos", (req, res) => {
        let userInfos = bll.retrieveDataUser(); // [userEmail, userPassword, userName, userId]
        res.json({
            userEmail: userInfos[0],
            userPassword: userInfos[1],
            username: userInfos[2],
            uId: userInfos[3]
        });
    });


    app.post("/login", (req, res) => {
        bll.LoginUser(res, req)
            // console.log(req.session.id)

    });

    app.get('/logout', function(req, res) {
        bll.LogoutUser(res, req)

    });

    app.post("/", (req, res) => {
        bll.RegisterUsers(res, req);
    });

    app.put("/api/user/edit", (req, res) => {

    });

    app.delete("/api/user/remove", (req, res) => {

    });

}

module.exports = {
    addUserController
}