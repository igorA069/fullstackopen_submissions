import { useState } from "react"
import { useEffect } from "react"

import Filter from './components/Filter.jsx'
import AddPersonForm from "./components/AddPersonForm.jsx"
import PersonsDisplay from "./components/PersonsDisplay.jsx"
import Notification from "./components/Notification.jsx"

import personServices from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [filterStr, setFilterStr] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => { personServices.getAll().then(receivedPersons => setPersons(receivedPersons)) }, []) 

  const onChangeNewName = (event) => setNewName(event.target.value)
  const onChangeNewNumber = (event) => setNewNumber(event.target.value)
  const onChangeFilterStr = (event) => setFilterStr(event.target.value)

  const displayNotification = (text, isError) => {
    setNotification(text)
    setIsError(isError)
    // make notification disappear after a delay
    setTimeout(() => setNotification(''), 5000)
  }

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

      displayNotification(`Added ${newName}`, false)
    } else {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`))
      {
        const foundPerson = persons[foundIndex]
        // create a copy of this person, with updated number
        const updatedPerson = {...foundPerson, number: newNumber}
        personServices.updatePerson(foundPerson.id, updatedPerson)
          .then(() => {
            onUpdatePerson(foundPerson, updatedPerson)
            displayNotification(`Updated number for ${newName}`, false)
          })
          .catch((error) => {
            displayNotification(`Information of ${foundPerson.name} have already been removed from server`, true)
          })
      }
    }
  }

  const onUpdatePerson = (personToUpdate, updatedPerson) => { 

    // set persons to a copy of itself, in which this person has been updated
    const updatedPersons = persons.map(person => person.id === personToUpdate.id ? updatedPerson : person)
    setPersons(updatedPersons)
  }

  const onDeletePerson = (personToDelete) => () => {
    const isDeleteConfirmed = window.confirm(`Delete ${personToDelete.name}?`)
    if (isDeleteConfirmed)
    {
      return personServices.deletePerson(personToDelete.id)
        .then(response => setPersons(persons.filter(person => person.id !== personToDelete.id)))
    }
    else return null;
  }

  return (
      <>
        <h2>Phonebook</h2>
        <Notification text={notification} isError={isError}/>
        <Filter value={filterStr} onChange={onChangeFilterStr} />
        <h2>Add new</h2>
        <AddPersonForm onSubmit={onAddPerson} newName={newName} onChangeNewName={onChangeNewName} newNumber={newNumber} onChangeNewNumber={onChangeNewNumber}/>
        <h2>Numbers</h2>
        <PersonsDisplay persons={persons} filterStr={filterStr} onDeletePerson={onDeletePerson}/>
      </>
    )
  }

export default App
