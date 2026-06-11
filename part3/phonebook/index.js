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

app.get('/api/persons', (request, response, next) => {
  PersonModel.find({})
  .then(results => { response.json(results) })
  .catch(error => next(error))
})

app.get('/info', (request, response, next) => { 
  PersonModel.find({})
  .then(results => {
    response.send(`
    <p>Phonebook has info for ${results.length} people.</p>
    <p>${new Date().toString()}</p>`)
  })
  .catch(error => next(error))

  })

app.get('/api/persons/:id', (request, response, next) => {
  const requestedId = request.params.id
  PersonModel.findById(requestedId)
    .then(result => { 
      if (result)
      {
        response.json(result) 
      } else {
        response.status(404).json({'error': `id ${requestedId} does not exist`})
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const requestedId = request.params.id
  PersonModel.findByIdAndDelete(requestedId)
  .then(result => { 
    if (result) {
      response.status(204).end() 
    } else {
      response.status(404).json({'error':`id ${requestedId} does not exist`})
    }
  })
  .catch(error => next(error)) 
})

app.post('/api/persons', (request, response, next) => {
  const isBodyValid = verifyReqBody(request, response)
  if (isBodyValid) {
    const newPerson = new PersonModel({
      name: request.body.name,
      number: request.body.number
    })
    newPerson.save()
    .then(result => { response.json(result) })
    .catch(error => next(error))
    // const sameNameExists = persons.find(person => person.name === request.body.name)
    // if (sameNameExists)
    // {
    //   response.status(400).json({error: 'name must be unique'})
    // } else {
    //   const newPerson = {...request.body, id: Math.floor(Math.random()*10000)}
    //   persons = persons.concat(newPerson)
    //   response.json(newPerson)
    // }
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const requestedId = request.params.id
  if (verifyReqBody(request, response))
  {
    PersonModel.findById(requestedId)
    .then(result => {
      if (result)
      {
        result.name = request.body.name
        result.number = request.body.number
        result.save()
        .then(result => response.json(result))
        .catch(error => next(error))
      } else {
        response.status(404).json({'error':`id ${requestedId} does not exist`})
      }
    })
    .catch(error => next(error))
  }
})

const errorHandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    return response.status(400).json({'error': `Invalid person id ${error.value}`})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({'error': error.message})
  }
  next(error)
}

app.use(errorHandler)

app.listen(3001, () => {
  console.log('Started')
})