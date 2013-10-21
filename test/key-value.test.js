// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Test Key-Value methods.
 */


// Module Dependencies.
var assert = require('assert')
var nock = require('nock')
var token = 'sample_token'
var db = require('../')(token)

// Mock data.
var users = {
  steve: {
    "name": "Steve Kaliski",
    "email": "sjkaliski@gmail.com",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  },
  david: {
    "name": "David Byrd",
    "email": "byrd@bowery.io",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  }
}

// Override http requests.
var fakeOrchestrate = nock('https://api.orchestrate.io/')
  .get('/v0/users/sjkaliski@gmail.com')
  .reply(200, users.steve)
  .put('/v0/users/byrd@bowery.io')
  .reply(201)
  .delete('/v0/users/byrd@bowery.io')
  .reply(204)

suite('Key-Value', function () {
  test('Get value by key', function (done) {
    db.get('users', 'sjkaliski@gmail.com')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.steve, JSON.parse(res.body))
      done()
    })
  })

  test('Store value at key', function (done) {
    db.put('users', 'byrd@bowery.io', users.david)
    .then(function (res) {
      assert.equal(201, res.statusCode)
      done()
    })
  })

  test('Remove value by key', function (done) {
    db.remove('users', 'byrd@bowery.io')
    .then(function (res) {
      assert.equal(204, res.statusCode)
      done()
    })
  })
})
