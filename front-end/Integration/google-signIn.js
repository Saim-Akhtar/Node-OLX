const onload = () => {
    gapi.load('auth2', () => {
        gapi.auth2.init()
    })
}


function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    var auth = googleUser.getAuthResponse(true)
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        // console.log("Access Token: " + auth.access_token)

    console.log('after response')
    const url = "http://localhost:3000/user/oauth/google"

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_token: auth.access_token
            })
        })
        .then(response => response.json())
        .then(data => {

            localStorage.setItem('userAuthToken', JSON.stringify(data))
                // console.log(data)
            window.location.href = 'index.html'
        })
        .catch(err => {
            console.log(err)
        })
}


// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function() {
//         console.log('User signed out.');
//     });
// }