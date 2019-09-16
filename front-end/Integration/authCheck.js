const checkUserAuth = () => {
    const authenticationToken = localStorage.getItem('userAuthToken')
    return authenticationToken
}

const navBar_Auth = () => {
    const authenticationToken = checkUserAuth()
    if (authenticationToken === null) {
        return false
    }
    const logButtons = [...document.querySelectorAll('.log_Button')]

    logButtons.map((button) => {
        button.setAttribute('href', 'index.html')
        button.innerHTML = 'Log Out'
        button.addEventListener('click', () => {
            localStorage.removeItem('userAuthToken')
        })
    })
    return true
}

export default { checkUserAuth, navBar_Auth }