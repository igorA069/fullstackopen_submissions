const PersonsDisplay = (props) =>
<div>
    { 
        props.persons.filter((person) => person.name.toLowerCase().includes(props.filterStr.toLowerCase())).
            map((person) => (
            <div key={person.name}>
                {person.name} {person.number}
                <button onClick={ props.onDeletePerson(person) }>
                    delete
                </button>
            </div>)) 
    } 
</div>

export default PersonsDisplay 