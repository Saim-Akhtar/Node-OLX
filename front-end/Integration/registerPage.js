import auth from "./authCheck.js"


const authToken = auth.checkUserAuth()

if (authToken !== null) {
    window.location = "./index.html"
}