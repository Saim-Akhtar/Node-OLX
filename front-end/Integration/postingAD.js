import auth from './authCheck.js'



let getAuthToken
console.log("herre")

getAuthToken = auth.navBar_Auth()

if (getAuthToken === null) {
    window.location = "./index.html"
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

            window.location.href = 'adds.html?productID=' + data.id



        })
        .catch(err => {
            console.log(`Error : ${err}`)
        })
}