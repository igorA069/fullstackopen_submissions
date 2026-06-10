const express = require('express')
const app = express()

const PersonModel = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))

const morgan = require('morgan')
morgan.token('json-content', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-content'))

const cors = require('cors')
app.use(cors({origin: '*'}))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const verifyReqBody = (request, response) => {
  let isValid = false
  if (!request.body) {
    response.status(400).json({error: 'request body missing.'})
  } else if (!request.body.name) {
    response.status(400).json({error: 'person name missing.'})
  } else if (!request.body.number) {
    response.status(400).json({error: 'person number missing.'})
  } else {
    isValid = true
  }
  return isValid
}

app.get('/api/persons', (request, response) => {
  PersonModel.find({}).then(results => { response.json(results) })
})

app.get('/info', (request, response) => { 
  PersonModel.find({}).then(results => {
    response.send(`
    <p>Phonebook has info for ${results.length} people.</p>
    <p>${new Date().toString()}</p>`)}) 
  })

app.get('/api/persons/:id', (request, response) => {
  const requestedId = request.params.id
  PersonModel.findById(requestedId)
    .then(result => {response.json(result)})
    .catch(error => {response.status(404).json(error.message)})
})

app.delete('/api/persons/:id', (request, response) => {
  const requestedId = request.params.id
  filteredPersons = persons.filter(person => person.id != requestedId)
  persons = filteredPersons
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const isBodyValid = verifyReqBody(request, response)
  if (isBodyValid) {
    const sameNameExists = persons.find(person => person.name === request.body.name)
    if (sameNameExists)
    {
      response.status(400).json({error: 'name must be unique'})
    } else {
      const newPerson = {...request.body, id: Math.floor(Math.random()*10000)}
      persons = persons.concat(newPerson)
      response.json(newPerson)
    }
  }
})

app.put('/api/persons/:id', (request, response) => {
  const requestedId = request.params.id
  const match = persons.find(person => person.id == requestedId)
  if (verifyReqBody(request, response))
  {
    if (match) {
      persons = persons.map(person => person.id == requestedId ? request.body : person)
      response.status(200).end()
    } else {
      response.status(404).json({error: 'id not found'})
    }
  }
})

app.listen(3001, () => {
  console.log('Started')
})