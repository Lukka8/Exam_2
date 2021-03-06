const express = require("express")
const router = express.Router()
const mysql = require("../Utils/MySQL")
const hash = require("object-hash")

const Tokengenerator = require("../Utils/Token")

router.get("/Login", (req, res) => {
    if (req.session.token) {
        res.redirect("/")
    } else {
        res.render("./Account/Login", {})
    }
})

router.get("/Register", (req, res) => {
    if (req.session.token) {
        res.redirect("/")
    } else {
        res.render("./Account/Register", {})
    }
})

router.get("/Banned", (req, res) => {

    var token = req.session.token

    if (token) {
        mysql("SELECT * FROM account WHERE Token = ?", [token], result => {

            if (!result || result[0] == undefined) {
                res.redirect("/Logout")
                return
            }

            if (result[0].Banned) {
                res.render("./Account/Banned", {
                    message: result[0].BanMessage,
                    accountname: result[0].Username,
                    accountadmin: result[0].Admin
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

router.get("/Logout", (req, res) => {
    if (req.session.token) {
        req.session.destroy()
    }

    res.redirect("/")
})

router.post("/LoginAccount", (req, res) => {
    if (req.session.token) {
        res.status(200).send(true)
        return
    }

    var data = ""

    req.on("data", (d) => {
        data += d
    })

    req.on("end", () => {

        data = JSON.parse(data)

        var username = data.username
        var password = data.password

        if (!username) {
            res.send("Username is empty.")
            return
        }

        if (!password) {
            res.send("Password is empty.")
            return
        }

        password = hash(password)

        mysql("SELECT * FROM account WHERE Username = ? AND Password = ? ", [username, password], (result) => {
            if (result && result[0]) {
                req.session.token = result[0].Token
                res.status(200).send(true)
            } else {
                res.send("Account doesn't exists or password is wrong.")
                return
            }
        })
    })
})

router.post("/RegisterAccount", (req, res) => {
    if (req.session.token) {
        res.redirect("/")
        return
    }

    var data = ""

    req.on("data", (d) => {
        data += d
    })

    req.on("end", () => {

        data = JSON.parse(data)

        var firstname = data.firstname
        var lastname = data.lastname
        var username = data.username
        var email = data.email
        var password_1 = data.password_1
        var password_2 = data.password_2

        if (!firstname) {
            res.send("Firstname is empty.")
            return
        }

        if (!lastname) {
            res.send("Lastname is empty.")
            return
        }

        if (!username) {
            res.send("Username is empty.")
            return
        }

        if (!email) {
            res.send("Email is empty.")
            return
        }

        if (!password_1) {
            res.send("Password is empty.")
            return
        }

        if (!password_2) {
            res.send("Please repeat the password.")
            return
        }

        if (password_1 != password_2) {
            res.send("Passwords don't match.")
            return
        }

        var key = Tokengenerator(150)

        mysql("SELECT * FROM account WHERE Username = ? LIMIT 1", [username], result => {
            if (result && result[0]) {
                res.send("Account already exists with this username.")
                return
            }
        })

        mysql("SELECT * FROM account WHERE Email = ? LIMIT 1", [email], result => {
            if (result && result[0]) {
                res.send("Account already exists with this email.")
                return
            }
        })

        mysql('INSERT INTO account (Token, Username, Email, Password, Firstname, Lastname) VALUES (?, ?, ?, ?, ?, ?)', [key, username, email, hash(password_1), firstname, lastname], (result) => {
            if (result) {
                req.session.token = key
                res.send(true)
                return
            }
        })
    })
})

module.exports = router