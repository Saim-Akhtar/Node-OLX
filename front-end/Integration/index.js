import auth from './authCheck.js'

const authenticationToken = auth.checkUserAuth()
console.log(authenticationToken)
    // if authenticationToken will be null, mena hte user is logged out and navbar will show login/register option
    // otherwise logout



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
            </div>
            <div class="col s12 m3 l3">
                <h5>$${product.price}</h5>
                <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Post bid</a>
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
    })
    .catch((error) => {
        console.log("error: " + error)
    })