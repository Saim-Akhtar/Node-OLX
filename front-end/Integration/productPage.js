import auth from './authCheck.js'

// complete data
let productData


let getAuthToken







getAuthToken = auth.navBar_Auth()


const windowURL = window.location.href
const index = windowURL.lastIndexOf('productID=') + 10

let productID = windowURL.slice(index, index + 24)
console.log(productID)

const url = "http://localhost:3000/products/" + productID
    // console.log(url)
fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then((data) => {
        productData = data
        let condition

        if (getAuthToken !== null && getAuthToken.id === productData.userID) {
            // when user is logged in and the product is his product
            condition = 1
        } else if (getAuthToken !== null && getAuthToken.id !== productData.userID) {
            // when user is logged in and the product is other users' product
            condition = 2
        } else if (getAuthToken === null) {
            // when user is not logged in
            condition = 3
        }


        insert_productData(productData.Product, condition)
    })
    .catch(error => {
        console.log(error)
    })



const insert_productData = (data, condition) => {
    console.log(data)


    console.log(condition)


    // title of the page
    document.querySelector('title').innerHTML = data.title


    const title = document.querySelector('.product-main-title')
    const owner = document.querySelector('.product-sub-title')
    const date = document.querySelector('.product-post-date')
    const priceByOwner = document.querySelector('.price-by-owner')
    const category = document.querySelector('.category')
    const buyer = document.querySelector('.buyer')
    const price = document.querySelector('.add-price')
    const statusSold = document.querySelector('.status-sold')
    const bidButton = document.querySelector('#bidButton')
    const productImage = document.querySelector('#productImage')

    // inserting data into HTML page
    title.innerHTML = data.title
    owner.innerHTML = `Ad by <a href="profile.html?profileID=${data.userID._id}"  >
                        ${data.userID.firstName} ${data.userID.lastName}</a>`

    date.innerHTML = `Date: ${data.time}`

    priceByOwner.innerHTML = `Starting Price by owner: $${data.priceByOwner}`

    category.innerHTML = `Category: ${data.category}`

    price.innerHTML = `$${data.highestBidPrice}`

    productImage.src = data.productImage

    const bids = [...data.bids]

    // DOM manipulation if product is sold or not
    if (data.statusSold === true) {


        buyer.innerHTML = `Buyer: <a  href="profile.html?profileID=${JSON.parse(data.buyer).buyerID}">${JSON.parse(data.buyer).buyerName}</a> `
        statusSold.innerHTML = 'Sold'
        statusSold.classList.add('red-text')
        bidButton.classList.add('hide')



    } else {


        // if the user is logged in and product is unsold
        if (condition === 1) {


            bidButton.classList.add('red')
            bidButton.classList.remove('modal-trigger')
            bidButton.href = 'JavaScript:void(0)'
            bidButton.innerHTML = `Delete`
            bidButton.addEventListener('click', () => {
                deleteProduct()
            })

        }

        // if the user can bid on the product
        else if (condition === 2) {


            // if the user has already bid on the product
            const bidderData = bids.filter((bid) => bid.bidderID === getAuthToken.id)[0]
            if (!bidderData) {
                bidButton.addEventListener('click', () => {
                    const bidForm = document.querySelector('#bidForm')
                    bidForm.addEventListener('submit', () => {
                        const biddingPrice = (bidForm.bid_price.value).match(/\d/g).join('');
                        bidForm.reset()
                        bidProduct(biddingPrice)
                    })
                })
            } else {
                bidButton.innerHTML = `Bid Again`
                bidButton.addEventListener('click', () => {
                    const bidForm = document.querySelector('#bidForm')
                    bidForm.addEventListener('submit', () => {
                        const biddingPrice = (bidForm.bid_price.value).match(/\d/g).join('');
                        bidForm.reset()
                        modifyBid(biddingPrice)
                    })
                })
            }
        } else if (condition === 3) {
            bidButton.addEventListener('click', () => {
                bidButton.classList.remove('modal-trigger')
                alert('You are not logged In! Kindly Log In to bid on the product ')
            })
        }

        statusSold.innerHTML = 'Unsold'
        statusSold.classList.add('green-text')
    }


    // inserting bids into the list
    const bidList = document.querySelector('.comment-list')


    if (bids.length === 0) {
        bidList.innerHTML = `
            <h5 class="center red-text">No bids Yet</h5>
        `
    } else {
        bids.forEach((bid) => {
            const bid_container = document.createElement('div')
            bid_container.className = 'comment'
            if (condition === 1 && data.statusSold === false) {
                bid_container.innerHTML = `
            <div class="row">
                                <div class="col s12 m3 l3 center">
                                    <h5 ><a id="${bid.bidderID}" href="profile.html?profileID=${bid.bidderID}" >${bid.bidderName}</a></h5>
                                </div>
                                <div class="col s12 m6 l6">
                                <h6 class="center">Offered Price: $<span>${bid.biddingPrice}</span></h6>
                                </div>
                                <div class="col s12 m3 l3 center">
                                    <a class="waves-effect waves-light btn center-align green accept_offer" >Accept Offer</a>
                                </div>
                            </div>
            `
            } else {
                bid_container.innerHTML = `
                <div class="row">
                                    <div class="col s12 m6 l6 center">
                                        <h5><a href="profile.html?profileID=${bid.bidderID}" >${bid.bidderName}</a></h5>
                                    </div>
                                    <div class="col s12 m6 l6">
                                    <h6 class="center">Offered Price: $${bid.biddingPrice}</h6>
                                    </div>
                                </div>
                `
            }


            bidList.appendChild(bid_container)
        })
    }

    getBids_acceptOffers()
}



// when user bid on a product
const bidProduct = (biddingPrice) => {

    console.log(biddingPrice)
    const biddingData = {}
    biddingData.bidderID = getAuthToken.id
    biddingData.bidderName = getAuthToken.username
    biddingData.biddingPrice = biddingPrice
    console.log(biddingData)

    const url = "http://localhost:3000/products/bidding/" + productData.id

    fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(biddingData)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            // localStorage.setItem('userAuthToken', JSON.stringify(data))
            // window.location = "index.html"
            window.location.reload()
                // console.log(data)


        })
        .catch(err => {
            console.log(`Error : ${err}`)
        })


}


// when user modify bid on a product
const modifyBid = (biddingPrice) => {

    console.log(biddingPrice)
    const biddingData = {}
    biddingData.bidderID = getAuthToken.id
    biddingData.biddingPrice = biddingPrice
    console.log(biddingData)

    const url = "http://localhost:3000/products/modifyBid/" + productData.id

    fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(biddingData)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            // localStorage.setItem('userAuthToken', JSON.stringify(data))
            // window.location = "index.html"
            // console.log(data)
            window.location.reload()

        })
        .catch(err => {
            console.log(`Error : ${err}`)
        })


}



// when owner deletes a product
const deleteProduct = () => {

    const url = "http://localhost:3000/products/delete/" + productData.id
    console.log(url)
    fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {

            window.location = "index.html"
                // console.log(data)


        })
        .catch(err => {
            console.log(`Error : ${err}`)
        })


}




// get all the bids data and apply function to it
const getBids_acceptOffers = () => {

    const offerBtns = [...document.querySelectorAll('.accept_offer')]
    offerBtns.map((btn) => {
        btn.addEventListener('click', () => {
            const mainParent = btn.parentNode.parentNode
            const buyerID = mainParent.querySelector('a').getAttribute('id')
            const buyerName = mainParent.querySelector('a').innerHTML
            const buyingPrice = mainParent.querySelector('span').innerHTML
            const buyer = { buyerID, buyerName, buyingPrice }
            send_sellRequest(buyer)
        })
    })

}




// when owner sells a product
const send_sellRequest = (buyer) => {
    const bodyData = {
        statusSold: true,
        buyer: JSON.stringify(buyer),
        highestBidPrice: buyer.buyingPrice
    }
    console.log(bodyData)

    const url = "http://localhost:3000/products/sell/" + productData.id

    fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            // localStorage.setItem('userAuthToken', JSON.stringify(data))
            window.location.reload()
                // console.log(data)


        })
        .catch(err => {
            console.log(`Error : ${err}`)
        })
}