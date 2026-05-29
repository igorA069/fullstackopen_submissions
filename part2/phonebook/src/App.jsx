import { useState } from "react"

import Filter from './components/Filter.jsx'
import AddPersonForm from "./components/AddPersonForm.jsx"
import PersonsDisplay from "./components/PersonsDisplay.jsx"

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

  const onChangeNewName = (event) => setNewName(event.target.value)
  const onChangeNewNumber = (event) => setNewNumber(event.target.value)
  const onChangeFilterStr = (event) => setFilterStr(event.target.value)

  const onAddPerson = (event) => {
    event.preventDefault()
    // Check if name already exists
    if (persons.map((person) => person.name).indexOf(newName) == -1) {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))

      setNewName('')
      setNewNumber('')
    } else {
      alert(newName + ' is already added to phonebook.')
    }
  }

  return (
      <>
        <h2>Phonebook</h2>
        <Filter value={filterStr} onChange={onChangeFilterStr} />
        <h2>Add new</h2>
        <AddPersonForm onSubmit={onAddPerson} newName={newName} onChangeNewName={onChangeNewName} newNumber={newNumber} onChangeNewNumber={onChangeNewNumber}/>
        <h2>Numbers</h2>
        <PersonsDisplay persons={persons} filterStr={filterStr}/>
      </>
    )
  }

export default App
