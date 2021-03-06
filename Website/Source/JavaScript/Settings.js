const profilepicture = document.getElementById("profilepicture")
const displaypicture = document.getElementById("displaypicture")
const savebutton = document.getElementById("save")
const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const username = document.getElementById("username")
const profesion = document.getElementById("profesion")
const description = document.getElementById("description")

profilepicture.addEventListener("input", e => {
    var reader = new FileReader()


    reader.onload = event => {
        displaypicture.src = event.target.result
    }

    reader.readAsDataURL(profilepicture.files[0])
})


savebutton.addEventListener("click", async e => {
    e.preventDefault()

    var formdata = new FormData()

    formdata.append("profile", profilepicture.files[0])
    formdata.append("firstname", firstname.value)
    formdata.append("lastname", lastname.value)
    formdata.append("username", username.value)
    formdata.append("profesion", profesion.value)
    formdata.append("description", description.value)

    var data = await fetch("../../Settings/Post", {
        method: "post",
        body: formdata
    })

    var text = await data.text()

    console.log(text);
})