'use strict'
process.env.DEV = true

let mongoose = require('mongoose')
let User = require('../models/newUser')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('User', () => {
  before((done) => {
    User.remove({}, (err) => {
      done()
    })
  })

  let newUser = {
    name: 'A. Testy McTesterson',
    email: 'test@test.com',
    password: 'password!23'
  }

  let badPw = {
    name: 'A. Testy McTesterson',
    email: 'test@test.com',
    password: 'notRight'
  }

  let newPw = {
    email : 'test@test.com',
    password: 'newPassword!23',
    name : 'new name',
    token: ''
  }

  let noUser = {
    email: 'no@test.com'
  }

  let id = ''

  describe('/POST user/signup', () => {
    it('should add a new user', (done) => {
      chai.request(server)
        .post('/user/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Added new user')
          res.body.should.have.property('success').eql(true)
          done()
        })
    })
    it('should not add a user twice', (done) => {
      chai.request(server)
        .post('/user/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('User exists')
          res.body.should.have.property('success').eql(false)
          done()
        })
    })
  })

  describe('/POST user/signin', () => {
    it('should sign in an existing user', (done) => {
      chai.request(server)
        .post('/user/signin')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Logged In')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('token').be.a('string')
          res.body.should.have.property('admin').be.a('boolean')
          res.body.should.have.property('name').be.a('string')
          res.body.should.have.property('id').be.a('string')
          id = res.body.id
          newPw.token = res.body.token
          done()
        })
    })
    it('should not sign in a user that is not signed up', (done) => {
      chai.request(server)
        .post('/user/signin')
        .send(noUser)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').equal('User not found')
          res.body.should.have.property('success').be.a('boolean').equal(false)
          done()
        })
    })
    it('should not sign in a user with the wrong password', (done) => {
      chai.request(server)
        .post('/user/signin')
        .send(badPw)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').equal('Password does not match.')
          res.body.should.have.property('success').be.a('boolean').equal(false)
          done()
        })
    })
  })

  describe('/POST user/updateUser/:userId', () => {
    it('should be able to update a users info', (done) => {
      chai.request(server)
        .post('/user/updateUser/' + id)
        .send(newPw)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').equal('User updated')
          res.body.should.have.property('success').be.a('boolean').equal(true)
          done()
        })
    })
  })
})
