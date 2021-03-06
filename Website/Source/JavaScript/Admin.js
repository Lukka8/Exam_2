const promote = document.getElementById("promote")
const demote = document.getElementById("demote")
const promotebutton = document.getElementById("promotebutton")
const demotebutton = document.getElementById("demotebutton")

promotebutton.addEventListener("click", e => {
    e.preventDefault()
    var url = "http://localhost:8000/POST/Admins/" + promote.value + "/true"

    fetch(url, {method: "post"})
})

demotebutton.addEventListener("click", e => {
    e.preventDefault()

    var url = "http://localhost:8000/POST/Admins/" + demote.value + "/false"

    fetch(url, {method: "post"})
})