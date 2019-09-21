const checkUserAuth = () => {
    const authenticationToken = localStorage.getItem('userAuthToken')
    return JSON.parse(authenticationToken)
}

const navBar_Auth = () => {
    const authenticationToken = checkUserAuth()
    if (authenticationToken === null) {
        return null
    }
    const logButtons = [...document.querySelectorAll('.log_Button')]
    const userNameButtons = [...document.querySelectorAll('.userName')]
    const myProductButtons = [...document.querySelectorAll('.my-products')]
    const myBidsButtons = [...document.querySelectorAll('.my-bids')]


    myBidsButtons.map(button => {
        button.classList.remove('hide')
        button.setAttribute('href', 'profile.html?profileID=' + authenticationToken.id + '#user-bids')
    })

    myProductButtons.map(button => {
        button.classList.remove('hide')
        button.setAttribute('href', 'profile.html?profileID=' + authenticationToken.id + '#user-products')
    })


    userNameButtons.map(button => {
        button.setAttribute('href', 'profile.html?profileID=' + authenticationToken.id)
        button.innerHTML = `${authenticationToken.username}`
        button.classList.remove('hide')
    })

    logButtons.map((button) => {
        button.setAttribute('href', 'index.html')

        button.innerHTML = 'Log Out'
        button.addEventListener('click', () => {
            // console.log('signing out')
            if (authenticationToken.method === 'google') {
                signOut()
            }
            localStorage.removeItem('userAuthToken')
        })
    })
    return authenticationToken
}




export default { checkUserAuth, navBar_Auth }