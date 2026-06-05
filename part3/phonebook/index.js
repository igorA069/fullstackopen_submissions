const express = require('express')
const app = express()

app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

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

app.get('/api/persons', (request, response) => {response.json(persons)})

app.get('/info', (request, response) => { response.send(`
  <p>Phonebook has info for ${persons.length} people.</p>
  <p>${new Date().toString()}</p>`) })

app.get('/api/persons/:id', (request, response) => {
  const requestedId = request.params.id
  const matchingPerson = persons.find(person => person.id === requestedId)
  if (matchingPerson) {
    response.json(matchingPerson)
  } else {
    response.status(404).send(`Person id ${requestedId} does not exist.`)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const requestedId = request.params.id
  filteredPersons = persons.filter(person => person.id !== requestedId)
  persons = filteredPersons
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  if (!request.body.name) {
    response.status(400).json({error: 'person name missing.'})
  } else if (!request.body.number) {
    response.status(400).json({error: 'person number missing.'})
  } else {
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

app.listen(3001, () => {
  console.log('Started')
})