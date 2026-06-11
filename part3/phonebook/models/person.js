const mongoose = require('mongoose')

// const db_url = `mongodb+srv://${db_username}:${db_password}@cluster0.fbifx5b.mongodb.net/PhonebookDB?appName=Cluster0`

const db_url = process.env.MONGODB_CONNECT_STRING
mongoose.connect(db_url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person