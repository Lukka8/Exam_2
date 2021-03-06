const express = require("express")
const router = express.Router()
const mysql = require("../Utils/MySQL")

router.get("/", (req, res) => {

    var token = req.session.token;

    if (token) {
        mysql('SELECT * FROM account WHERE Token = ? LIMIT 1', [token], (result) => {

            if (!result || result[0] == undefined) {
                res.redirect("./Account/Logout")
                return
            }

            if (result) {
                
                if (result[0].Banned) {
                    res.redirect("./Account/Banned")
                    return
                }

                res.render("index", {
                    accountname: result[0].Username,
                    accountadmin: result[0].Admin
                })
            } else {
                res.redirect("./Account/Logout")
            }
        })
    } else {
        res.render("index", {})
    }
})

router.get("/User/:username", (req, res) => {
    mysql('SELECT * FROM account WHERE username = ? LIMIT 1', [req.params.username], (result1) => {


        if (req.session.token) {
            mysql('SELECT * FROM account WHERE Token = ?', [req.session.token], (result2) => {

                if (!result2 || result2[0] == undefined) {
                    res.redirect("./Account/Logout")
                    return
                }
    

                if (result2[0].Banned) {
                    res.redirect("./Account/Banned")
                    return
                }

                if (result1.length == 0) {
                    res.render("User", {
                        banned: true,
                        accountname: result2[0].Username,
                        accountadmin: result2[0].Admin
                    })
                } else {
                    res.render("User", {
                        username: result1[0].Username,
                        firstname: result1[0].Firstname,
                        lastname: result1[0].Lastname,
                        description: result1[0].Description,
                        Profesion: result1[0].Profesion,
                        id: result1[0].ID,
                        profilepicture: result1[0].Profile,
                        banned: result1[0].Banned,
                        admin: result1[0].Admin,
                        accountname: result2[0].Username,
                        accountadmin: result2[0].Admin
                    })
                }
            })
        } else {
            if (result1.length == 0) {
                res.render("User", {
                    banned: true
                })
            } else {
                res.render("User", {
                    username: result1[0].Username,
                    firstname: result1[0].Firstname,
                    lastname: result1[0].Lastname,
                    description: result1[0].Description,
                    Profesion: result1[0].Profesion,
                    id: result1[0].ID,
                    profilepicture: result1[0].Profile,
                    banned: result1[0].Banned,
                    admin: result1[0].Admin
                })
            }
        }
    })
})

router.get("/User", (req, res) => {

    var token = req.session.token

    if (token) {
        mysql("SELECT * FROM account WHERE= ?", [token], result => {
            if (!result || result[0] == undefined) {
                res.redirect("./Account/Logout")
                return
            }
        })
    }

    res.redirect("/User/lukka8_8")
})

module.exports = router