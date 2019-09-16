import auth from './authCheck.js'

let authBoolean

window.onload = () => {
    authBoolean = auth.navBar_Auth()

    const windowURL = window.location.href
    let userID = windowURL.slice(windowURL.length - 24, windowURL.length)

    const url = "http://localhost:3000/user/" + userID

    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((userData) => {
            insert_userData(userData.userProfile)
                // console.log(userData.userProfile)
        })
        .catch(error => {
            console.log(error)
        })
}

const insert_userData = (data) => {
    console.log(data)
    const method = data.method
    const name = document.querySelector('#userName')
    const email = document.querySelector('#getEmail')
    const contact = document.querySelector('#getContact')

    // inserting into Profile Page
    name.innerHTML = `${data[method].firstName} ${data[method].lastName}`
    email.innerHTML = `<strong>Email     : </strong> ${data[method].email}`
    contact.innerHTML = `<strong>Contact     : </strong> ${data[method].contact}`

    // if user is logged in and its his own account
    // if(authBoolean === true && )
}