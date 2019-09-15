const checkUserAuth = () => {
    const authenticationToken = localStorage.getItem('userAuthToken')
    return authenticationToken
}


export default { checkUserAuth }