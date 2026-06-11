const mongoose = require('mongoose')

const app = require('./app')
const config = require('./config/config')

mongoose.connect(config.MONGODB_CONNECT_STRING, { family: 4 })

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})