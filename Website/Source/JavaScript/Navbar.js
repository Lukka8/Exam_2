const navbarButton = document.getElementById("navbarButton")
const nav = document.querySelector("nav")
const userSearch = document.getElementById("userSearch")
const userSearchList = document.getElementById("userSearchList")
const limit = 5


navbarButton.addEventListener("click", (e) => {
    nav.classList.toggle("active")
})

userSearch.addEventListener("input", (e) => {

    userSearchList.innerHTML = "";

    fetch("http://localhost:8000/POST/Search/" + userSearch.value + "/" + limit).then(response => {
        response.json().then(json => {
            for (let index = 0; index < json.result.length; index++) {
                const Content = json.result[index];
                var userelement = document.createElement("a")
                var userimage = document.createElement("img")
                var username = document.createElement("p")

                userelement.classList.add("user_search")
                username.innerText = Content.username
                userimage.src = "http://localhost:8000/Source/Images/ProfilePictures/" + Content.profile

                userelement.href = "../User/"+ Content.username

                userelement.appendChild(userimage)
                userelement.appendChild(username)

                userSearchList.append(userelement)
            }
        })
    })
})