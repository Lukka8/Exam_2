const express = require("express");
const router = express.Router()
const mysql = require('../Utils/MySQL')
const fs = require("fs")
const path = require("path")
const Token = require("../Utils/Token")

router.get("/Settings", (req, res) => {
    var token = req.session.token

    if (token) {
        mysql("SELECT * FROM account WHERE Token = ?", [token], result => {
            if (!result || result[0] == undefined) {
                res.redirect("../Logout")
                return
            }

            res.render("./Settings/Settings" ,{
                email: result[0].Email,
                username: result[0].Username,
                firstname: result[0].Firstname,
                lastname: result[0].Lastname,
                description: result[0].Description,
                profesion: result[0].Profesion,
                profile: result[0].Profile,
                accountname: result[0].Username,
                accountadmin: result[0].Admin
            })
        })
    } else {
        res.redirect("../")
    }
})


router.post("/Post", (req, res) => {
    var token = req.session.token

    if (token) {
        var file = req.files
        var data = req.body

        if (file && file.profile) {

            var type = file.profile.name.split(".")
            var filename = Token(150) + "." + type[type.length - 1]
            var avatar_path = "./Website/Source/Images/ProfilePictures/" + filename

            file.profile.mv(avatar_path, (err) => {
                if (err) throw err
                mysql("UPDATE account SET profile = ?, Username = ?, Firstname = ?, Lastname = ?, Profesion = ?, Description = ?", [filename, data.username, data.firstname, data.lastname, data.profesion, data.description], (data) => {
                    console.log(data)
                })
            })
        }
    }
})

module.exports = router