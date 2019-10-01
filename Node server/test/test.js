const chai = require('chai')
const chai_http = require('chai-http')
const app = require('../app')

// configure chai

chai.use(chai_http)
chai.should()

describe('Products', () => {

    // Test to fetch all the products
    it('it should fetch all the products', (done) => {
        chai.request(app)
            .get('/products')
            .end((err, res) => {

                res.should.have.status('200')
                res.body.should.be.an('object')
                res.body.should.have.property('Total_Products')
                res.body.should.have.property('Products')
                done()
            })
    })

    // Test to fetch a product
    it('it should fetch a single product', (done) => {
        const productID = "5d8656ff7d838304280192d2"
        chai.request(app)
            .get(`/products/${productID}`)
            .end((err, res) => {
                res.should.have.status('200')
                res.should.be.an('object')
                res.body.should.have.property('id')
                res.body.should.have.property('userID')
                done()
            })
    })

    // Test to fetch all products and bid products of a certain user
    it('it should fetch all products of a certain user', (done) => {
        const userID = "5d8489b205f2f0381cdee5de"
        chai.request(app)
            .get(`/products/user/${userID}`)
            .end((err, res) => {
                res.should.have.status('200')
                res.should.be.an('object')
                res.body.should.have.property('userProducts')
                res.body.should.have.property('user_bidProducts')
                done()
            })
    })


})

describe('User', () => {

    // Test to fetch user profile
    it('it should fetch user profile', (done) => {
        const userID = "5d8489b205f2f0381cdee5de"
        chai.request(app)
            .get(`/user/${userID}`)
            .end((err, res) => {
                res.should.have.status('200')
                res.should.be.an('object')
                res.body.should.have.property('userProfile')
                done()
            })
    })

    // Test to login As a user
    it('it should login as user', (done) => {

        const user = {
            email: "saim@node.com",
            password: "123456"
        }

        chai.request(app)
            .post(`/user/login`)
            .send(user)
            .end((err, res) => {
                res.should.have.status('200')
                res.should.be.an('object')
                res.body.should.have.property('token')
                res.body.should.have.property('id')
                res.body.should.have.property('username')
                res.body.should.have.property('method')
                done()
            })
    })

})