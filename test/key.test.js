var token = 'd10728b1-fb0d-4f02-b778-c0d6f3c725ff'

var db = require('../')(token)

// db.get('users', 'sjkaliski@gmail.com')
// .then(function (res) {
//   console.log(JSON.parse(res.body))
// })

// db.put('users', 'byrd@gmail.com', {
//   "name": "David Byrd",
//   "email": "byrd@gmail.com",
//   "location": "New York",
//   "type": "paid",
//   "gender": "male"
// })
// .then(function (res) {
//   db.get('users', 'byrd@gmail.com')
//   .then(function (res) {
//     console.log(JSON.parse(res.body))
//   })
// })

// db.createGraphRelation('users', 'sjkaliski@gmail.com', )

db.newGraphBuilder()
  .from('users', 'sjkaliski@gmail.com')
  .related('likes')
  .to('movies', 'The Matrix')
  .then(function (res) {
    console.log(res.body)
  })
  .fail(function (err) {
    console.log(err)
  })

// db.newGraphReader()
//   .from('users', 'sjkaliski@gmail.com')
//   .related('likes')
//   .then(function (res) {
    
//   })
