import auth from './authCheck.js'

const authenticationToken = auth.checkUserAuth()
console.log(authenticationToken)

const windowURL = window.location.href
let productID = windowURL.slice(windowURL.length - 24, windowURL.length)

const url = "http://localhost:3000/products/" + productID
    // console.log(url)
fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then((productData) => {
        console.log(productData)
    })
    .catch(error => {
        console.log(error)
    })
    // authentication check are to be applied here