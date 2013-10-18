/**
 * @fileoverview Orchestrate API Client.
 * @author Steve Kaliski <steve@bowery.io>
 */

var request = require('request')
var Q = require('kew')

/**
 * @constructor
 * @param {string} API token.
 */
function Client (token) {
  if (!token) throw Error('API Key required.')

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
  if (!collection || !key) return false
  return this._get([Client.ApiEndPoint, collection, key].join('/'))
}


/**
 * Put data in collection by key-value
 * @param {string} collection.
 * @param {string} key.
 * @param {object} value.
 * @return {Promise}
 */
Client.prototype.put = function (collection, key, data) {
  if (!collection || !key || !data) return false
  return this._put([Client.ApiEndPoint, collection, key].join('/'), data)
}


/**
 * Remove data from collection by key-value.
 * @param {string} collection.
 * @param {string} key.
 * @return {Promise}
 */
Client.prototype.remove = function (collection, key) {
  if (!collection || !key) return false
  return this._del([Client.ApiEndPoint, collection, key].join('/'))
}


/**
 * Search collection by key.
 * @param {string} collection.
 * @param {string} query.
 * @return {Promise}
 */
Client.prototype.search = function (collection, query) {
  if (!collection || !query) return false
  return this._get([Client.ApiEndPoint, collection].join('/') + '?query=' + query)
}

/**
 * GET request with auth.
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
 * PUT request with auth.
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
 * Module exports.
 */
module.exports = Client
