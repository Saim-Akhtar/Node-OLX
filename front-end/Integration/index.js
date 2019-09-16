import auth from './authCheck.js'

// imported function to check authentication and manipulate DOM
auth.navBar_Auth()



// inserts the products in list
const insertProduct = (productList, product) => {
    console.log(product)
    const card = document.createElement('div')
    card.classList.add('card', 'horizontal', 'productCard')
    const imagePath = `/Node Server backend/${product.productImage}`
    card.innerHTML = `
    <div class="card-image">
    <img src="${imagePath}" width="100px" height="190px">
</div>
<div class="card-stacked">
    <div class="card-content">
        <div class="row">
            <div class="col s12 m9 l9">
                <h5>${product.title}</h5>
                <h6>Ad by <a target="_blank" href="profile.html?profileID=${product.userID}"> ${product.firstName} </a></h6>
            </div>
            <div class="col s12 m3 l3">
                <h5>Current Bid: $${product.highestBidPrice}</h5>
                <br>
                <a target="_blank" class="waves-effect waves-light btn" href="adds.html?productID=${product.id}">View Product</a>
            </div>
        </div>
    </div>
    
</div>
    `
    productList.appendChild(card)
}

// get all the products and productList in HTML page and add products using insertProduct()
const addProductsInList = (products) => {
    let productList = document.getElementById('productList')
    products.filter(product => product.statusSold === false).map((product) => {
        insertProduct(productList, product)
    })
}


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