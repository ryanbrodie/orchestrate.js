/**
  The `GraphBuilder` uses Orchestrate's graph api
  to generate relations between cross-collection
  objects.

  Functions are chained. Example usage:
  db.newGraph()
    .from('collectionA', 'keyA')
    .related('relation')
    .to('collectionB', 'keyB')

  db.readGraph()
    .from('collectionA', 'keyA')
    .related('relation')
  
  In `readGraph` related can accept an array of relations (read
  left to right) or a single relation.
 */
function GraphBuilder () {
  
}

GraphBuilder.prototype.from = function (collection, key) {
  return this
}

GraphBuilder.prototype.related = function (relation) {
  return this
}

GraphBuilder.prototype.to = function (collection, key) {
  // return this._method('test', {})
}

GraphBuilder.prototype.setMethod = function (method) {
  return this
}

module.exports = GraphBuilder
