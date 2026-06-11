const mongoose = require('mongoose')

// const db_url = `mongodb+srv://${db_username}:${db_password}@cluster0.fbifx5b.mongodb.net/PhonebookDB?appName=Cluster0`

const db_url = process.env.MONGODB_CONNECT_STRING
mongoose.connect(db_url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        match: /^[0-9]{2,3}-[0-9]+$/    // match 2 leading digits, followed by a dash, followed by more digits
    }
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