// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Orchestrate API Client.
 */


// Module Dependencies.
var request = require('request')
var Q = require('kew')
var GraphBuilder = require('./graph')


/**
 * Creates an instance of Client which can be used to access
 * the Orchestrate API.
 *
 * @constructor
 * @param {string} API token.
 */
function Client (token) {
  if (!token) throw new Error('API Key required.')

  if (!(this instanceof Client)) {
    return new Client(token)
  }

  /**
   * @constant {object} http header.
   */
  this.header = {
    'Content-Type': 'application/json'
  }

  /**
   * @private {string} API token used for HTTP authentication.
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
 * @param {string} collection.
 * @param {string} key.
 * @return {Promise}
 */
Client.prototype.get = function (collection, key) {
  if (!collection || !key) throw new Error('Collection and key required.')
  return this._get(this.generateApiUrl([collection, key]))
}


/**
 * Put data in collection by key-value
 * @param {string} collection.
 * @param {string} key.
 * @param {object} value.
 * @return {Promise}
 */
Client.prototype.put = function (collection, key, data) {
  if (!collection || !key || !data) throw new Error('Collection, key, and JSON object required.')
  return this._put(this.generateApiUrl([collection, key]), data)
}


/**
 * Remove data from collection by key-value.
 * @param {string} collection.
 * @param {string} key.
 * @return {Promise}
 */
Client.prototype.remove = function (collection, key) {
  if (!collection || !key) throw new Error('Collection and key required.')
  return this._del(this.generateApiUrl([collection, key]))
}


/**
 * Search collection by key.
 * @param {string} collection.
 * @param {string} query.
 * @return {Promise}
 */
Client.prototype.search = function (collection, query) {
  if (!collection || !query) throw new Error('Collection and query required.')
  return this._get(this.generateApiUrl([collection], query))
}


Client.prototype.newGraphBuilder = function () {
  return new GraphBuilder()
    .setWrite(true)
    .setDelegate(this)
}


Client.prototype.newGraphReader = function () {
  return new GraphBuilder()
    .setWrite(false)
    .setDelegate(this)
}


/**
 * GET request with authentication.
 * @private
 * @return {Promise}
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
 * @private
 * @return {Promise}
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
 * DELETE request with auth.
 * @private
 * @return {Promise}
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
 * @param {Array<string>} path components.
 * @param {string} query string.
 * @return {string} url.
 */
Client.prototype.generateApiUrl = function (path, query) {
  path.unshift(Client.ApiEndPoint)
  path = path.join('/')
  if (!!query) path += '?query' + query
  return path
}


/**
 * Module exports.
 */
module.exports = Client
