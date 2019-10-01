import auth from './authCheck.js'

// imported function to check authentication and manipulate DOM
auth.navBar_Auth()

let allProducts



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
        allProducts = data.Products
        addProductsInList(data.Products)
            // console.log(data.Products)
    })
    .catch((error) => {
        console.log("error: " + error)
    })


// get all the products and productList in HTML page and add products using insertProduct()
const addProductsInList = (products) => {


    // check if the product is search via category

    const windowURL = window.location.href
    if (windowURL.includes('category=')) {


        console.log(windowURL)
        const index = windowURL.lastIndexOf('category=') + 9
        let categorySearched = windowURL.slice(index, windowURL.length)
        categorySearched = categorySearched[categorySearched.length - 1] === "#" ?
            categorySearched.slice(0, categorySearched.length - 1) : categorySearched


        // designing the button of category
        const category_links = [...document.querySelectorAll('.my-links a')]

        const get_category_btn = category_links.filter(cat => cat.id === categorySearched)[0]
        get_category_btn.classList.add('btn', 'btn-category')

        // applying search in products
        products = products.filter(product => product.category === categorySearched)

    }


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
    const card = document.createElement('div')
    card.classList.add('card', 'horizontal', 'productCard', 'row', 'container_padding')
    card.innerHTML = `
    <div class="card-image col s12 m5 center">
    <img src="${product.productImage}" width="100px" height="190px">
</div>
<div class="card-stacked col s12 m5">
    <div class="card-content">
        <div class="row">
            <div class="col s12 m6 l7">
                <h5>${product.title}</h5>
                <h6>Ad by <a  href="profile.html?profileID=${product.userID}"> ${product.name} </a></h6>
            </div>
            <div class="col s12 m6 l5">
                <h6>Current Bid: $${product.highestBidPrice}</h6>
                <br>
                <a  class="waves-effect waves-light btn-small" href="adds.html?productID=${product.id}">View Product</a>
            </div>
        </div>
    </div>
    
</div>
    `
    productList.appendChild(card)
}




// -----------Below stuff is all applied on the search funcitonality on the top main------------ //


// filter the products by title
const getProductsByTitle = (value) => {

    if (value === "") {
        return
    }
    const list = allProducts.filter(product => product.title.toLowerCase().includes(value))
    console.log(list)
    suggestionList.innerHTML = ``

    list.map(element => {
        const div = document.createElement('div')

        div.innerHTML = `

            <div class="card horizontal" style="height: 50px">
          <div class="card-image left" style="width: 20%">
            <img src="${element.productImage}" style="height: 100%">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p><strong> <a  class="black-text" href="adds.html?productID=${element.id}"> ${element.title} </a> </strong></p>
            </div>
          </div>
        </div>

            `

        suggestionList.appendChild(div)
    });

}

const searchForm = document.getElementById('searchBar')
const searchBar = searchForm.querySelector('#searchBar input')
const suggestionList = document.getElementById('search_suggestion')
const closeSearch = document.getElementById('closeSearch')

searchForm.addEventListener('submit', () => {
    const searchedItem = searchBar.value.toLowerCase().trim()
    const queryItem = allProducts.filter(item => item.title.toLowerCase() === searchedItem)[0]

    if (queryItem === undefined) {
        alert("No Such Product Found")
        return
    }

    window.location.href = "adds.html?productID=" + queryItem.id


})




closeSearch.addEventListener('click', () => {
    searchBar.value = ""
    suggestionList.style.display = "none"
})

searchBar.addEventListener('keyup', (e) => {

    suggestionList.style.display = "block"
    const query = e.target
    const value = query.value.trim()
    if (value === "") {
        suggestionList.style.display = "none"
    }
    getProductsByTitle(query.value)
})