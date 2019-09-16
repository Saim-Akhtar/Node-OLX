import auth from './authCheck.js'

// imported function to check authentication and manipulate DOM


const insert_productData = (data) => {
    console.log(data)
    const title = document.querySelector('.product-main-title')
    const owner = document.querySelector('.product-sub-title')
    const date = document.querySelector('.product-post-date')
    const priceByOwner = document.querySelector('.price-by-owner')
    const category = document.querySelector('.category')
    const buyer = document.querySelector('.buyer')
    const price = document.querySelector('.add-price')
    const statusSold = document.querySelector('.status-sold')
    const bidButton = document.querySelector('#bidButton')

    // inserting data into HTML page
    title.innerHTML = data.title
    const name = data.userID.local.firstName || data.userID.google.firstName || data.userID.facebook.firstName
    owner.innerHTML = `Ad by <a href="profile.html?profileID=${data.userID._id}" target="_blank" >
                        ${name}</a>`

    date.innerHTML = `Date: ${data.time}`

    priceByOwner.innerHTML = `Starting Price by owner: $${data.priceByOwner}`

    category.innerHTML = `Category: ${data.category}`

    price.innerHTML = `$${data.highestBidPrice}`

    // DOM manipulation if product is sold or not
    if (data.statusSold === true) {
        buyer.innerHTML = `Buyer: <a target="_blank" href="profile.html?profileID=${JSON.parse(data.buyer).buyerID}">${JSON.parse(data.buyer).buyerName}</a> `
        statusSold.innerHTML = 'Sold'
        statusSold.classList.add('red-text')
        bidButton.setAttribute('disabled', 'disabled')
    } else {
        statusSold.innerHTML = 'Unsold'
        statusSold.classList.add('green-text')
    }

    console.log(data.bids)

    // inserting bids into the list
    const bidList = document.querySelector('.comment-list')

    const bids = [...data.bids]
    bids.forEach((bid) => {
        const bid_container = document.createElement('div')
        bid_container.className = 'comment'
        bid_container.innerHTML = `
        <div class="row">
                            <div class="col s12 m3 l3 center">
                                <h5><a href="profile.html?profileID=${bid.bidderID}" target="_blank">${bid.bidderName}</a></h5>
                            </div>
                            <div class="col s12 m6 l6">
                            <h6 class="center">Offered Price: $${bid.biddingPrice}</h6>
                            </div>
                            <div class="col s12 m3 l3 center">
                                <a class="waves-effect waves-light btn center-align green">Accept Offer</a>
                            </div>
                        </div>
        `
        bidList.appendChild(bid_container)
    })

}

window.onload = () => {
    const authBoolean = auth.navBar_Auth()

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
            insert_productData(productData.Product)
        })
        .catch(error => {
            console.log(error)
        })
}

// authentication check are to be applied here