import auth from './authCheck.js'

// imported function to check authentication and manipulate DOM
auth.navBar_Auth()


const url = "http://localhost:3000/products"
    // On loading , all the products are fetched
fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    })
    .then(response => response.json())
    .then((data) => {
        addProductsInList(data.Products)
            // console.log(data.Products)
    })
    .catch((error) => {
        console.log("error: " + error)
    })


// get all the products and productList in HTML page and add products using insertProduct()
const addProductsInList = (products) => {

    let productList = document.getElementById('productList')

    if (products.length === 0) {
        productList.innerHTML = ` <h5 class="red-text center"> No Products in the Stock </h5>`
    }

    products.filter(product => product.statusSold === false).map((product) => {
        insertProduct(productList, product)
    })
}




// inserts the products in list
const insertProduct = (productList, product) => {
    console.log(product)
    const card = document.createElement('div')
    card.classList.add('card', 'horizontal', 'productCard')
    card.innerHTML = `
    <div class="card-image">
    <img src="${product.productImage}" width="100px" height="190px">
</div>
<div class="card-stacked">
    <div class="card-content">
        <div class="row">
            <div class="col s12 m9 l9">
                <h5>${product.title}</h5>
                <h6>Ad by <a  href="profile.html?profileID=${product.userID}"> ${product.name} </a></h6>
            </div>
            <div class="col s12 m3 l3">
                <h5>Current Bid: $${product.highestBidPrice}</h5>
                <br>
                <a  class="waves-effect waves-light btn" href="adds.html?productID=${product.id}">View Product</a>
            </div>
        </div>
    </div>
    
</div>
    `
    productList.appendChild(card)
}