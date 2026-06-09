const isAddPersonRequested = (process.argv.length == 5)
const isShowAllPersonsRequested = (process.argv.length == 3)

if (isAddPersonRequested || isShowAllPersonsRequested) {
  const db_password = process.argv[2]
  
  const mongoose = require('mongoose')
  const db_username = 'fullstackopen'
  mongoose.connect(`mongodb+srv://${db_username}:${db_password}@cluster0.fbifx5b.mongodb.net/PhonebookDB?appName=Cluster0`)
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  const Person = mongoose.model('Person', personSchema)

  if (isAddPersonRequested) {
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    const person = new Person({
      name: personName,
      number: personNumber
    })
      
    person.save().then(result => {
      console.log(result)
      mongoose.connection.close()
    })
  }
  else if (isShowAllPersonsRequested) {
    Person.find({}).then(results => {
      console.log('Phonebook:') 
      results.forEach(result => {
        console.log(`${result.name} ${result.number}`)
      })
      mongoose.connection.close()
    })
  } else {
    // We should never get here
    console.log('Internal logic mismatch')
  } 
} else {
  console.log(
`Usage: 
a) to add a new person to the database:
node index.js <DB_PASSWORD> <NEW_PERSON_NAME> <NEW_PERSON_NUMBER>
or
b) to display all stored persons:
node index.js <DB_PASSWORD>`)
}