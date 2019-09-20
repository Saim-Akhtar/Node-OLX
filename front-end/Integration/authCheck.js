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