// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Event builder.
 */


// Module Dependencies.
var Builder = require('./builder')

/**
 * @constructor
 */
function EventBuilder () {}


require('util').inherits(EventBuilder, Builder)


/**
 * Set event origin.
 * @param {string} collection.
 * @param {string} key.
 * @return {EventBuilder}
 */
EventBuilder.prototype.from = function (collection, key) {
  if (!collection || !key) throw new Error('Collection and key required.')
  this.collection = collection
  this.key = key
  return this
}


/**
 * Set event type.
 * @param {string} type.
 * @return {EventBuilder}
 */
EventBuilder.prototype.type = function (type) {
  if (!type) throw new Error('Type required.')
  this.type = type
  if (!this.write) return this._execute('get')
  return this
}


/**
 * Set event data.
 * @param {Object} data.
 * @return {EventBuilder}
 */
EventBuilder.prototype.data = function (data) {
  if (!data) throw new Error('Data required.')
  this.data = data
  return this._execute('put')
}


/**
 * Execute event read/write.
 * @private
 * @param {string} method.
 * @return {Object}
 */
EventBuilder.prototype._execute = function (method) {
  var pathArgs = [this.collection, this.key, 'events', this.type]
  var url = this.getDelegate() && this.getDelegate().generateApiUrl(pathArgs)
  return this.getDelegate()['_' + method](url, this.data)
}


/**
 * Module exports.
 */
module.exports = EventBuilder
