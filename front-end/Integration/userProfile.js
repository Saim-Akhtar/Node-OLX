import auth from './authCheck.js'



let getAuthToken






getAuthToken = auth.navBar_Auth()
    // getAuthId = getAuthToken.id

const windowURL = window.location.href
const index = windowURL.lastIndexOf('profileID=') + 10

let userID = windowURL.slice(index, index + 24)
console.log(userID)
const url = "http://localhost:3000/user/" + userID

fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then((userData) => {


        // Dom Manipulation if different user
        if (userData.userProfile._id !== getAuthToken.id) {
            document.getElementById('btn_postAd').classList.add('hide')
        }


        insert_userData(userData.userProfile)
            // console.log(userData)
    })
    .catch(error => {
        console.log(error)
    })


const insert_userData = (data) => {
    console.log(data)

    const name = document.querySelector('#userName')
    const email = document.querySelector('#getEmail')
    const contact = document.querySelector('#getContact')
    const city = document.querySelector('#getCity')
    const profilePic = document.querySelector('#profilePic')


    const method = data.method
        // inserting into Profile Page
    name.innerHTML = `${data.firstName} ${data.lastName}`
    email.innerHTML = `<strong>Email     : </strong> ${data[method].email}`
    contact.innerHTML = `<strong>Contact     : </strong> ${data.contact}`
    city.innerHTML = `<strong>City     : </strong> ${data.city}`
    if (data.profilePic !== null) {
        profilePic.src = data.profilePic
    }
    // if user is logged in and its his own account
    // if(getAuthId === true && )
}

// <--------- Posting an Ad ------------> //
const postAd = document.querySelector('#productForm')
postAd.addEventListener('submit', (e) => {
    const title = postAd.product_title.value
    const category = postAd.product_category.value
    const price = (postAd.product_price.value).match(/\d/g).join('');

    let productImage = null //default if user doesn't upload profile picture

    const file = document.querySelector('#productImage').files[0]
        // checking if user has uploaded a pic
    if (file !== undefined) {
        const reader = new FileReader()
        reader.onload = () => {
            productImage = reader.result
            sendProduct_request({ title, category, price, productImage })
        }
        reader.readAsDataURL(file)
    } else {
        sendProduct_request({ title, category, price, productImage })
    }

    postAd.reset()
})


const sendProduct_request = (productData) => {

    productData.userID = getAuthToken.id
    console.log(productData)
    const url = "http://localhost:3000/products"
    fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(productData)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            // localStorage.setItem('userAuthToken', JSON.stringify(data))
            // window.location = "index.html"
            console.log(data)


        })
        .catch(err => {
            console.log(`Error : ${err}`)
        })
}