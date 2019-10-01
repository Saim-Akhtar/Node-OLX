# Node OLX 

An OLX based Auction System

A Progressive Web Application using a backend REST API 

Click Here:- [Node-OLX](https://node-olx.firebaseapp.com)


## Setup The Project

### 1) Clone this repo
    
    git clone https://github.com/Saim-Akhtar/Node-OLX.git
    
### 2) Install Node Modules
Open the cmd and :-

    cd "Node server"
    npm install
    

### 3) Prepare the .env File

- Create a cluster in mongodb atlas, create a password and use it in .env file as MONGODB_ATLAS_PWD
- To use Google OAUTH, go to https://console.developers.google.com/ and create an app. Get the client   id and secret from there
- To use Facebook OAUTH, go to https://developers.facebook.com/ and create an app. Get the client       id and secret from there

### 4) Start Server

    nodemon server.js


### 5) Front-end OAUTH Setup
Replace Each "Your-Google-Client-ID" with your google client ID you have created with app

### 6) Live Browser

Open the index.html with live browser



## Deployment
- Front-end Deployed on Firebase
- Backend REST API Deployed on Heroku server


## Technologies Used for Front-end

- HTML/CSS/JavaScript/Jquery
- Materialize CSS
- PWA

## Technologies Used for Back-end Rest API

- Node JS
- Express JS
- Mongoose
- Bcrypt (For Password Hashing)

## Testing Tools

- Mocha
- Chai
- Chai-http

## Authentication Tools

- JSON Web Tokens
- Passport
- Passport-Local-Strategy
- Passport-Google-Strategy
- Passport-Facebook-Strategy

## OAUTH
- Google API OAUTH
- Facebook API OAUTH