const loginButton = document.getElementById("login")
const username = document.getElementById("username")
const password = document.getElementById("password")
const error = document.getElementById("error")
const errorDisplay = document.querySelector("#error p")


loginButton.addEventListener("click", async (e) => {
    e.preventDefault()
    var data = await fetch("./Account/LoginAccount", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
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