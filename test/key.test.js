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

// db.remove('users', 'byrd@gmail.com')

// db.createGraphRelation('users', 'sjkaliski@gmail.com', )

db.createGraph()
  .from('users', 'sjkaliski@gmail.com')
  .related('likes')
  .to('movies', 'Shawshank Redemption')
