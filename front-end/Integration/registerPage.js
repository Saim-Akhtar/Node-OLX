import auth from "./authCheck.js"


const authToken = auth.checkUserAuth()

if (authToken !== null) {
    window.location = "./index.html"
}

// <---------- Local Login of a user ------------------>
const login = document.querySelector('#login form')
login.addEventListener('submit', (e) => {
    const email = login.email.value
    const password = login.password.value
    const url = "http://localhost:3000/user/login"
    fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            localStorage.setItem('userAuthToken', JSON.stringify(data))
            window.location = "index.html"
                // console.log(data)

        })
        .catch(err => {
            document.getElementById('error_message').innerHTML = `**UnAuthorized User**`
            console.log(`Error : ${err}`)

        })
})


// <--------- Registering a user ---------->
const register = document.querySelector('#register form')
register.addEventListener('submit', (e) => {
    const firstName = register.first_name.value
    console.log(firstName)
    const lastName = register.last_name.value
    const email = register.reg_email.value
    const password = register.reg_password.value
    const contact = register.contact.value
    const city = register.city.value
    let profilePic = null //default if user doesn't upload profile picture

    const file = document.querySelector('#imageFile').files[0]
        // checking if user has uploaded a pic
    if (file !== undefined) {
        const reader = new FileReader()
        reader.onload = () => {
            profilePic = reader.result
            sendRegister_request({ firstName, lastName, email, password, contact, city, profilePic })
        }
        reader.readAsDataURL(file)
    } else {
        sendRegister_request({ firstName, lastName, email, password, contact, city, profilePic })
    }

    register.reset()
})


// Getting the user data and sendin POST request to the server
const sendRegister_request = (userData) => {
    console.log(userData)
    const url = "http://localhost:3000/user/signup"
    fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            localStorage.setItem('userAuthToken', JSON.stringify(data))
            window.location = "index.html"
                // console.log(data)


        })
        .catch(err => {
            console.log(`Error : ${err}`)
        })
}