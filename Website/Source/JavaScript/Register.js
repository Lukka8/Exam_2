const registerButton = document.getElementById("register")
const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password_1 = document.getElementById("password_1")
const password_2 = document.getElementById("password_2")
const error = document.getElementById("error")
const errorDisplay = document.querySelector("#error p")


registerButton.addEventListener("click", async (e) => {
    e.preventDefault()
    var data = await fetch("./Account/RegisterAccount", {
        method: "POST",
        body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            username: username.value,
            email: email.value,
            password_1: password_1.value,
            password_2: password_2.value
        })
    })

    var text = await data.text()

    if (text == "true") {
        document.location.reload()
        return
    }

    error.classList.remove("display-n")

    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            errorDisplay.innerHTML = text.substring(0, i)
        }, 25 * i);
    }
})