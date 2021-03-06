const express = require("express")
const router = express.Router()
const mysql = require("../Utils/MySQL")

router.get("/Search/:username/:limit", (req, res) => {
    mysql('SELECT username,profile FROM account WHERE username LIKE ? LIMIT ' + req.params.limit, [req.params.username + "%"], (result) => {
        res.send({
            result
        })
    })
})


router.get("/Post", (req, res) => {

    var token = req.session.token

    if (token) {
        mysql("SELECT * FROM account WHERE Token = ?", [token], result => {
            if (!result || result[0] == undefined) {
                res.redirect("../Logout")
                return
            }
        })
    }
})

router.get("/Admins", (req, res) => {
    mysql("SELECT username, profile FROM account WHERE Admin = ?", [1], result => {
        res.send({
            result
        })
    })
})

router.post("/Admins/:username/:type", (req, res) => {
    var token = req.session.token

    if (token) {
        mysql("SELECT * FROM account WHERE Token = ?", [token], result => {
            if (!result || result[0] == undefined) {
                res.redirect("../Logout")
                return
            }
        })
    }

    var type = false

    if (req.params.type == "true") {
        type = true
    } else {
        type = false
    }

    mysql('UPDATE account SET Admin = ? WHERE Username = ? ', [type, req.params.username], (result) => {
        console.log(result)
    })
})

module.exports = router