// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Graph relation builder.
 */


/**
 * @constructor
 */
function GraphBuilder () {}


/**
 * Set graph origin.
 * @param {string} collection.
 * @param {string} key.
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.from = function (collection, key) {
  if (!collection || !key) throw new Error('Collection and key required.')
  this.collection = collection
  this.key = key
  return this
}


/**
 * Set graph relation.
 * @param {string} relation.
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.related = function (kind) {
  if (!kind) throw new Error('Kind of relation required.')
  this.kind = kind
  if (!this.write) return this._execute('get')
  return this
}


/**
 * Set graph destination.
 * @param {string} collection.
 * @param {string} key.
 * @return {Object}
 */
GraphBuilder.prototype.to = function (toCollection, toKey) {
  if (!toCollection || !toKey) throw new Error('toCollection and toKey required.')
  this.toCollection = toCollection
  this.toKey = toKey
  return this._execute('put')
}


/**
 * Execute graph read/write.
 * @private
 * @param {string} method.
 * @return {Object}
 */
GraphBuilder.prototype._execute = function (method) {
  var relation = this.write ? 'relation' : 'relations'
  var pathArgs = [this.collection, this.key, relation, this.kind, this.toCollection, this.toKey]
  var url = this.getDelegate() && this.getDelegate().generateApiUrl(pathArgs)
  return this.getDelegate()['_' + method](url, {})
}


/**
 * Set delegate.
 * @param {Client} delegate.
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.setDelegate = function (delegate) {
  this.delegate = delegate
  return this
}


/**
 * Get delegate.
 * @return {Client}
 */
GraphBuilder.prototype.getDelegate = function () {
  return this.delegate
}


/**
 * Set write boolean.
 * @param {boolean}
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.setWrite = function (write) {
  this.write = write
  return this
}


/**
 * Module Exports.
 */
module.exports = GraphBuilder
