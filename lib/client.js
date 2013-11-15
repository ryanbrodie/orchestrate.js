// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Orchestrate API Client.
 */


// Module Dependencies.
var request = require('request')
var Q = require('kew')
var assert = require('assert')
var GraphBuilder = require('./graph')
var EventBuilder = require('./event')


/**
 * Creates an instance of Client which can be used to access
 * the Orchestrate API.
 *
 * @constructor
 * @param {string} token
 */
function Client (token) {
  assert(token, 'API key required.')
  if (!(this instanceof Client)) {
    return new Client(token)
  }

  /**
   * HTTP Header.
   * @type {Object}
   */
  this.header = {
    'Content-Type': 'application/json'
  }

  /**
   * API token used for HTTP Authentication.
   * @type {string}
   * @protected
   */
  this._token = token
}


/**
 * Api endpoint v0.
 * @enum {string}
 */
Client.ApiEndPoint = 'https://api.orchestrate.io/v0'


/**
 * Get data from collection by key-value.
 * @param {string} collection
 * @param {string} key
 * @return {Promise}
 */
Client.prototype.get = function (collection, key) {
  assert(collection && key, 'Collection and key required.')
  return this._get(this.generateApiUrl([collection, key]))
}


/**
 * Put data in collection by key-value
 * @param {string} collection
 * @param {string} key
 * @param {Object} data
 * @return {Promise}
 */
Client.prototype.put = function (collection, key, data) {
  assert(collection && key && data, 'Collection, key, and JSON object required.')
  return this._put(this.generateApiUrl([collection, key]), data)
}


/**
 * Remove data from collection by key-value.
 * @param {string} collection
 * @param {string} key
 * @return {Promise}
 */
Client.prototype.remove = function (collection, key) {
  assert(collection && key, 'Collection and key required.')
  return this._del(this.generateApiUrl([collection, key]))
}


/**
 * Search collection by key.
 * @param {string} collection
 * @param {string} query
 * @return {Promise}
 */
Client.prototype.search = function (collection, query) {
  assert(collection && query, 'Collection and query required.')
  return this._get(this.generateApiUrl([collection], query))
}


/**
 * Delete a collection.
 * @param {string} collection
 * @return {Promise}
 */
Client.prototype.deleteCollection = function (collection) {
  assert(collection, 'Collection required.')
  return this._del(this.generateApiUrl([collection]) + '?force=true')
}


/**
 * Create new graph builder.
 * @return {GraphBuilder}
 */
Client.prototype.newGraphBuilder = function () {
  return new GraphBuilder()
    .setWrite(true)
    .setDelegate(this)
}


/**
 * Create new graph reader.
 * @return {GraphBuilder}
 */
Client.prototype.newGraphReader = function () {
  return new GraphBuilder()
    .setWrite(false)
    .setDelegate(this)
}


/**
 * Create new event builder.
 * @return {EventBuilder}
 */
Client.prototype.newEventBuilder = function () {
  return new EventBuilder()
    .setWrite(true)
    .setDelegate(this)
}


/**
 * Create new event reader.
 * @return {EventBuilder}
 */
Client.prototype.newEventReader = function () {
  return new EventBuilder()
    .setWrite(false)
    .setDelegate(this)
}


/**
 * GET request with authentication.
 * @param {string} url
 * @return {Promise}
 * @protected
 */
Client.prototype._get = function (url) {
  var defer = Q.defer()
  var self = this
  request.get(url, {
    auth: {user: self._token},
    headers: self.header
  }, defer.makeNodeResolver())
  return defer.promise
}


/**
 * PUT request with authentication.
 * @param {string} url
 * @param {Object} data
 * @return {Promise}
 * @protected
 */
Client.prototype._put = function (url, data) {
  var defer = Q.defer()
  var self = this
  request.put(url, {
    auth: {user: self._token},
    headers: self.header,
    json: data
  }, defer.makeNodeResolver())
  return defer.promise
}


/**
 * DELETE request with authentication.
 * @param {string} url
 * @return {Promise}
 * @protected
 */
Client.prototype._del = function (url) {
  var defer = Q.defer()
  var self = this
  request.del(url, {
    auth: {user: self._token},
    headers: self.header
  }, defer.makeNodeResolver())
  return defer.promise
}


/**
 * Generates and formats api url.
 * @param {Array.<string>} path
 * @param {string} query
 * @return {string}
 */
Client.prototype.generateApiUrl = function (path, query) {
  path.unshift(Client.ApiEndPoint)
  path = path.join('/')
  if (!!query) path += '?query=' + query
  return path
}


// Module exports.
module.exports = Client
