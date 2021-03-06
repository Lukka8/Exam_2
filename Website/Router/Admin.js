const express = require("express")
const router = express.Router();
const mysql = require("../Utils/MySQL")

router.get("/Admin", (req, res) => {

    var token = req.session.token

    if (token) {
        mysql("SELECT * FROM account WHERE Token = ?", [token], result => {
            if (!result) {
                res.redirect("../Account/Logout")
                return
            }

            res.render("./Admin/Admin", {
                accountname: result[0].Username,
                accountadmin: result[0].Admin
            })
        })
    } else {
        res.sendStatus(403)
    }
})

module.exports = router