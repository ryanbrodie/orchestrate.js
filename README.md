# orchestrate.js

Node Driver for [Orchestrate.io](http://orchestrate.io).


# Installation

```
$ npm install orchestrate
```

# Running Tests
Currently, Orchestrate.js runs against the actual Orchestrate API. At the moment, there is no available local version to work with.

Ensure all dependencies are installed within the orchestrate director by running

```
$ npm install
```
To run tests:

```
$ npm test
```

# Creating a Client

```javascript
var db = require('orchestrate')(token)
```

# Running Queries
---
Orchestrate comes with support for GET/PUT/DEL for key-value queries, as well as search, graph, and events. Documentation can be found [here](https://docs.orchestrate.io/).

All queries are promise based. Just as a typical function would return a callback containing an error field followed by a result, orchestrate.js returns `then` and `fail` methods.

## Key-Value

To find a value:

```javascript
db.get('collection', 'key')
.then(function (result) {

})
.fail(function (err) {

})

```

To set a value:
```javascript
db.put('collection', 'key', {
  "name": "Steve Kaliski",
  "hometown": "New York, NY",
  "twitter": "@stevekaliski"
})
.then(function (result) {

})
.fail(function (err) {

})
```

## Search

```javascript
db.search('collection', 'query')
.then(function (result) {

})
.fail(function (err) {

})
```
