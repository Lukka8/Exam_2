const news = document.getElementById("news")
const users = document.getElementById("users")

fetch("http://localhost:8000/POST/Admins").then(response => {
    response.json().then(json => {
        if (json && json.result) {
            for (let i = 0; i < json.result.length; i++) {
                var element = json.result[i]

                var a = document.createElement("a")
                var img = document.createElement("img")
                var p = document.createElement("p")

                a.classList.add("user")
                a.href = "./User/"+element.username

                img.classList.add("staff")
                img.src = "./Source/Images/ProfilePictures/"+element.profile

                p.innerText = element.username

                a.appendChild(img)
                a.appendChild(p)
                users.appendChild(a)
            }
        }
    })
})