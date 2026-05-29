const AddPersonForm = (props) =>
<form onSubmit={props.onSubmit}>
    <div>Name: <input value={props.newName} onChange={props.onChangeNewName}/></div>
    <div>Number: <input value={props.newNumber} onChange={props.onChangeNewNumber}/></div>
    <div><button type='submit'>add</button></div>
</form>

export default AddPersonForm