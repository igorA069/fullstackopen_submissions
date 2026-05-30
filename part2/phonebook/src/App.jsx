import { useState } from "react"
import { useEffect } from "react"

import Filter from './components/Filter.jsx'
import AddPersonForm from "./components/AddPersonForm.jsx"
import PersonsDisplay from "./components/PersonsDisplay.jsx"

import personServices from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Mark Twain',
      number: '0001'
     }
  ])
  
  const [filterStr, setFilterStr] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => { personServices.getAll().then(receivedPersons => setPersons(receivedPersons)) }, []) 

  const onChangeNewName = (event) => setNewName(event.target.value)
  const onChangeNewNumber = (event) => setNewNumber(event.target.value)
  const onChangeFilterStr = (event) => setFilterStr(event.target.value)

  const onAddPerson = (event) => {
    event.preventDefault()
    // Check if name already exists
    const foundIndex = persons.map((person) => person.name).indexOf(newName)
    if (foundIndex == -1) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personServices.add(newPerson).then(receivedPerson => setPersons(persons.concat(receivedPerson)))

      setNewName('')
      setNewNumber('')
    } else {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`))
      {
        const foundPerson = persons[foundIndex]
        // create a copy of this person, with updated number
        const updatedPerson = {...foundPerson, number: newNumber}
        personServices.updatePerson(foundPerson.id, updatedPerson)
        onUpdatePerson(foundPerson, updatedPerson)
      }
    }
  }

  const onUpdatePerson = (personToUpdate, updatedPerson) => { 

    // set persons to a copy of itself, in which this person has been updated
    const updatedPersons = persons.map(person => person.id === personToUpdate.id ? updatedPerson : person)
    setPersons(updatedPersons)
  }

  const onDeletePerson = (personToDelete) => () => (window.confirm(`Delete ${personToDelete.name}?`)) ? personServices.deletePerson(personToDelete.id).then(response => setPersons(persons.filter(person => person.id !== personToDelete.id))) : {}  

  return (
      <>
        <h2>Phonebook</h2>
        <Filter value={filterStr} onChange={onChangeFilterStr} />
        <h2>Add new</h2>
        <AddPersonForm onSubmit={onAddPerson} newName={newName} onChangeNewName={onChangeNewName} newNumber={newNumber} onChangeNewNumber={onChangeNewNumber}/>
        <h2>Numbers</h2>
        <PersonsDisplay persons={persons} filterStr={filterStr} onDeletePerson={onDeletePerson}/>
      </>
    )
  }

export default App
