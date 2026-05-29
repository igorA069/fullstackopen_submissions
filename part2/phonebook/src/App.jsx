import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Mark Twain',
      number: '000'
     }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')

  const onChangeName = (event) => setNewName(event.target.value)
  const onChangeNumber = (event) => setNewNumber(event.target.value)
  const onChangeFilterStr = (event) => setFilterStr(event.target.value)

  const onAdd = (event) => {
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
        Filter shown with <input value={filterStr} onChange={onChangeFilterStr}></input>
        <h2>Add new</h2>
        <form onSubmit={onAdd}>
          <div>Name: <input value={newName} onChange={onChangeName}/></div>
          <div>Number: <input value={newNumber} onChange={onChangeNumber}/></div>
          <div><button type='submit'>add</button></div>
        </form>
        <h2>Numbers</h2>
        <div>{ persons.filter((person) => person.name.toLowerCase().includes(filterStr.toLowerCase())).map((person) => <div key={person.name}>{person.name} {person.number}</div>) } </div>
      </>
    )
  }

export default App
