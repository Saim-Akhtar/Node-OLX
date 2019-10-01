import auth from './authCheck.js'



let getAuthToken


getAuthToken = auth.navBar_Auth()
    // getAuthId = getAuthToken.id

const windowURL = window.location.href
const index = windowURL.lastIndexOf('profileID=') + 10

let userID = windowURL.slice(index, index + 24)
console.log(userID)
const url1 = "http://localhost:3000/user/" + userID
const url2 = "http://localhost:3000/products/user/" + userID

const fetchRequest1 = fetch(url1, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
const fetchRequest2 = fetch(url2, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})

const fetchData = async() => {
    try {

        const userResponse = await fetchRequest1
        const userData = await userResponse.json()
        const productResponse = await fetchRequest2
        const user_relatedProducts = await productResponse.json()
        console.log(user_relatedProducts)
            // console.log(user_relatedProducts)



        if (getAuthToken !== null) {
            if (userData.userProfile._id === getAuthToken.id) {
                insert_userBids(user_relatedProducts.user_bidProducts)
            }
        }


        insert_userData(userData.userProfile)
        insert_userProducts(user_relatedProducts.userProducts)
            // console.log(userData)


    } catch (err) {
        console.log(err)
    }

}
fetchData()


const insert_userProducts = (data) => {
    const user_products_tableDiv = document.querySelector('#user-products_tableDiv')
    if (data.length === 0) {
        user_products_tableDiv.innerHTML = `<h5 class="red-text center">No Ads Posted Yet</h5>`
        return
    }
    const tableBody = user_products_tableDiv.querySelector('tbody')

    data.map((item, index, array) => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td class="capital bold-letters">${index+1}</td>
        <td class="capital bold-letters blue-text text-darken-5"><a href="adds.html?productID=${item._id}">${item.title}</a> </td>
        <td class="capital bold-letters">${item.highestBidPrice}</td>
        <td class="capital bold-letters ${item.statusSold === true ?"red-text":"green-text"}">${item.statusSold === true ?"Sold":"Unsold"}</td>
        `
        tableBody.appendChild(row)
    })

}

const insert_userBids = (data) => {
    document.querySelector('#user-bids').classList.remove('hide')
    const user_bids_tableDiv = document.querySelector('#user-bids_tableDiv')
    if (data.length === 0) {
        user_bids_tableDiv.innerHTML = `<h5 class="red-text center">No Bids Yet</h5>`
        return
    }
    const tableBody = user_bids_tableDiv.querySelector('tbody')

    data.map((item, index, array) => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td class="capital bold-letters">${index+1}</td>
        <td class="capital bold-letters blue-text text-darken-5"><a href="adds.html?productID=${item._id}">${item.title}</a> </td>
        <td class="capital bold-letters">${item.highestBidPrice}</td>
        <td class="capital bold-letters ${item.statusSold === true ?"red-text":"green-text"}">${item.statusSold === true ?"Sold":"Unsold"}</td>
        `
        tableBody.appendChild(row)
    })
}


const insert_userData = (data) => {
    console.log(data)

    // title of the page
    document.querySelector('title').innerHTML = `${data.firstName} ${data.lastName}`


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

}